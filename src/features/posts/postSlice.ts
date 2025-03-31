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
                    // adding any fetched posts to the array
                    const existingIds = new Set(
                        state.posts.map((post) => post.id)
                    );
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
                    console.log('Post added:', newPost);
                    state.posts.push(newPost);
                }
            );
    },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
