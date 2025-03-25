import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { nanoid } from '@reduxjs/toolkit';
import { postsAdded } from '../../features/posts/postSlice.ts';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useAppDispatch();

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const savePostClicked = () => {
        if (title && content) {
            const newPost = {
                id: nanoid(),
                title,
                content,
            };
            dispatch(postsAdded(newPost));
            setTitle('');
            setContent('');
        }
    };

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
                    className="cursor-pointer mt-5 text-3xl w-full bg-white rounded-lg text-blue-950 p-2 "
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};
export default AddPostForm;
