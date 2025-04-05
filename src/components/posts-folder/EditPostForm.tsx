import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPostById, updatePost } from '../../features/posts/postSlice.ts';
import { selectAllUsers } from '../../features/users/userSlice.ts';

const EditPostForm = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const post = useAppSelector((state) =>
        postId ? selectPostById(state, String(postId)) : undefined
    );
    const users = useAppSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    // this must always be after all the hooks and cannot be before all react will throw an error
    if (!post) {
        return (
            <section className="w-full max-w-125 mx-auto mt-20">
                <h2 className="text-4xl font-bold">Post Not Found</h2>
            </section>
        );
    }

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(e.target.value);
    };

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const editPostClicked = async () => {
        if (canSave) {
            try {
                setRequestStatus('pending');
                await dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${post.id}`);
            } catch (err) {
                console.error('Failed to save edited post', err);
            } finally {
                setRequestStatus('idle');
            }
        }
    };

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="w-full max-w-125 mx-auto mx- mt-20">
            <h2 className="text-4xl font-bold">Add a New Post</h2>
            <form className="flex flex-col gap-y-5 mt-10">
                <label htmlFor="postTitle" className="text-2xl">
                    Post Title:
                </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className="rounded-lg bg-white p-4 text-blue-950"
                />

                <label htmlFor="postAuthor" className="text-2xl">
                    Author:
                </label>
                <select
                    id="postAuthor"
                    defaultValue={userId}
                    onChange={onAuthorChanged}
                    className="rounded-lg bg-white p-4 text-blue-950"
                >
                    <option value=""></option>
                    {userOptions}
                </select>

                <label htmlFor="postContent" className="text-2xl">
                    Post Content:
                </label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className="rounded-lg bg-white p-4 text-blue-950"
                    rows={5}
                />
                <button
                    type="button"
                    onClick={editPostClicked}
                    disabled={!canSave}
                    className={`cursor-pointer mt-5 text-3xl w-full bg-gray-400 rounded-lg text-blue-950 p-2 ${!canSave ? 'opacity-30 bg-gray-300' : 'opacity-100'}`}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};
export default EditPostForm;
