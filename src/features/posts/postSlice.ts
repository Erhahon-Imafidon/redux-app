import {
    createSlice,
    nanoid,
    PayloadAction,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
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
    count: 0, // This property is not used in the current code but can be useful for tracking the number of posts
};

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(POSTS_URL);
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err instanceof Error ? err.message : 'Network error occurred'
            );
        }
    }
);

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost: AddNewPostProp, { rejectWithValue }) => {
        try {
            const response = await axios.post(POSTS_URL, {
                title: initialPost.title,
                body: initialPost.content,
                userId: initialPost.userId,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err instanceof Error
                    ? err.message
                    : 'failed to create post. Check your network connection.'
            );
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
        } catch {
            // return rejectWithValue(
            //     err instanceof Error ? err.message : 'Unknown error'
            // );
            return initialPost; // only for testing purposes in redux not the ideal way
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (initialPost: PostSliceState, { rejectWithValue }) => {
        const { id } = initialPost;
        try {
            const response = await axios.delete(`${POSTS_URL}/${id}`);
            if (response.status === 200) return initialPost;
            return `${response.status}: ${response.statusText}`;
        } catch (err) {
            return rejectWithValue(
                err instanceof Error ? err.message : 'Unknown error'
            );
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // This reducer is commented out because we are using createAsyncThunk for adding posts
        // postsAdded: {
        //     reducer(state, action: PayloadAction<PostSliceState>) {
        //         state.posts.push(action.payload);
        //     },
        //     prepare(title: string, content: string, userId: string) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 date: new Date().toISOString(),
        //                 userId,
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     wow: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     coffee: 0,
        //                 },
        //             },
        //         };
        //     },
        // },
        reactionAdded(state, actions: PayloadAction<ReactionPayload>) {
            const { postId, reaction } = actions.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost && existingPost.reactions) {
                existingPost.reactions[reaction]++;
            }
        },
        increaseCount(state) {
            state.count += 1;
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
                            userId: post.userId.toString(),
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
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            })
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
            )
            .addCase(deletePost.fulfilled, (state, action) => {
                const apiPost = action.payload;
                if (typeof apiPost === 'string') {
                    state.error = apiPost;
                    console.warn('Delete post failed:', apiPost);
                    return;
                }

                // Now TypeScript knows payload is a PostSliceState
                const postId = apiPost.id.toString();

                if (!postId) {
                    console.error('Could not complete delete post');
                    // console.log(apiPost);
                    return;
                }

                // Update the posts array
                state.posts = state.posts.filter((post) => post.id !== postId);
            });
    },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getPostsCount = (state: RootState) => state.posts.count;

// A selector for a single post by ID
export const selectPostById = (state: RootState, postId: string) => {
    return state.posts.posts.find((post) => post.id === postId);
};

// This selector was created to memoize the result of filtering posts by userId to prevent unnecessary re-renders if nothing has changed
export const selectPostsByUserId = createSelector(
    [selectAllPosts, (_state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
