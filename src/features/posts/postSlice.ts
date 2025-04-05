import {
    createSlice,
    nanoid,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store.ts';
import { sub } from 'date-fns';

import {
    PostSliceState,
    PostStateProps,
    ReactionPayload,
    APIPost,
    AddNewPostProp,
} from '../../types.ts';

const initialState: PostStateProps = {
    posts: [],
    status: 'idle',
    error: null,
};

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (err) {
        return err instanceof Error ? err.message : 'Unknown error';
    }
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost: AddNewPostProp) => {
        try {
            const response = await axios.post(POSTS_URL, {
                title: initialPost.title,
                body: initialPost.content,
                userId: initialPost.userId,
            });
            return response.data;
        } catch (err) {
            return err instanceof Error ? err.message : 'Unknown error';
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (initialPost: PostSliceState) => {
        const { id, title, content, userId } = initialPost;
        try {
            const response = await axios.put(`${POSTS_URL}/${id}`, {
                title,
                body: content,
                userId,
            });
            return response.data;
        } catch (err) {
            return err instanceof Error ? err.message : 'Unknown error';
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsAdded: {
            reducer(state, action: PayloadAction<PostSliceState>) {
                state.posts.push(action.payload);
            },
            prepare(title: string, content: string, userId: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        reactionAdded(state, actions: PayloadAction<ReactionPayload>) {
            const { postId, reaction } = actions.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost && existingPost.reactions) {
                existingPost.reactions[reaction]++;
            }
        },
    },

    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchPosts.fulfilled,
                (state, action: PayloadAction<APIPost[]>) => {
                    state.status = 'succeeded';
                    // adding date and reactions
                    let min = 1;
                    const loadedPosts = action.payload.map((post) => {
                        return {
                            ...post,
                            id: post.id.toString(),
                            content: post.body, // Map the body field to content
                            date: sub(new Date(), {
                                minutes: min++,
                            }).toISOString(),
                            reactions: {
                                thumbsUp: 0,
                                wow: 0,
                                heart: 0,
                                rocket: 0,
                                coffee: 0,
                            },
                        };
                    });
                    // Prevent duplicate posts by checking existing ids
                    const existingIds = new Set(
                        state.posts.map((post) => post.id)
                    );
                    // adding any fetched posts to the array
                    const uniqueLoadedPosts = loadedPosts.filter(
                        (post) => !existingIds.has(post.id)
                    );
                    state.posts = state.posts.concat(uniqueLoadedPosts);
                }
            )
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(
                addNewPost.fulfilled,
                (
                    state,
                    action: PayloadAction<APIPost> & {
                        meta: { arg: AddNewPostProp };
                    }
                ) => {
                    const uniqueId = nanoid();
                    const newPost = {
                        id: uniqueId,
                        title: action.payload.title,
                        content: action.payload.body, // Convert body to content
                        userId: action.meta.arg.userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    };
                    state.posts.push(newPost);
                }
            )
            .addCase(
                updatePost.fulfilled,
                (state, action: PayloadAction<APIPost>) => {
                    const apiPost = action.payload;
                    const postId = apiPost.id.toString();
                    const existingPost = state.posts.find(
                        (post) => post.id === postId
                    );
                    if (!existingPost) {
                        console.error('Post not found in state');
                        return;
                    }
                    // Map API fields to Redux post structure
                    const updatedPost: PostSliceState = {
                        ...existingPost,
                        id: postId,
                        title: apiPost.title,
                        content: apiPost.body,
                        userId: apiPost.userId,
                        date: new Date().toISOString(),
                    };
                    // Update the posts array
                    const posts = state.posts.filter(
                        (post) => post.id !== postId
                    );
                    state.posts = [...posts, updatedPost];
                }
            );
    },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

// A selector for a single post by ID
export const selectPostById = (state: RootState, postId: string) => {
    return state.posts.posts.find((post) => post.id === postId);
};
export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
