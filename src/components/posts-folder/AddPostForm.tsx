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
        <section>
            <h2>Add a New Post</h2>
            <form className="flex flex-col gap-y-5">
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={savePostClicked}>
                    Save Post
                </button>
            </form>
        </section>
    );
};
export default AddPostForm;
