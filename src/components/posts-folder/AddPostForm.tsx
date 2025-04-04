import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addNewPost } from '../../features/posts/postSlice.ts';
import { selectAllUsers } from '../../features/users/userSlice.ts';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [addPostRequestStatus, setAddPostRequestStatus] = useState('idle');
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectAllUsers);
    const navigate = useNavigate();

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
        [title, content, userId].every(Boolean) &&
        addPostRequestStatus === 'idle';

    const savePostClicked = async () => {
        if (canSave) {
            try {
                setAddPostRequestStatus('pending');
                setError(null);
                await dispatch(addNewPost({ title, content, userId })).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            } catch (err) {
                setError(
                    typeof err === 'string'
                        ? err
                        : 'Failed to save post. Check your network connection.'
                );
                console.error('Failed to save the post: ', err);
            } finally {
                setAddPostRequestStatus('idle');
            }
        }
    };

    // To select the author
    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="w-full max-w-125 mx-auto mt-20">
            <h2 className="text-4xl font-bold">Add a New Post</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
                    <p>{error}</p>
                </div>
            )}

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
                    value={userId}
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
                />
                <button
                    type="button"
                    onClick={savePostClicked}
                    disabled={!canSave}
                    className={`cursor-pointer mt-5 text-3xl w-full bg-gray-600 rounded-lg text-blue-300 p-2 ${!canSave ? 'opacity-30 bg-gray-300' : 'opacity-100'}`}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};
export default AddPostForm;
