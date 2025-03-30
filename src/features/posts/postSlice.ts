import {
    createSlice,
    nanoid,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store.ts';
import { sub } from 'date-fns';

export interface PostSliceState {
    id: string;
    title: string;
    content: string;
    userId?: string;
    date: string;
    reactions?: {
        thumbsUp: number;
        wow: number;
        heart: number;
        rocket: number;
        coffee: number;
    };
}

export interface PostStateProps {
    posts: PostSliceState[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ReactionPayload {
    postId: string;
    reaction: keyof PostSliceState['reactions'];
}

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
                (state, action: PayloadAction<PostSliceState[]>) => {
                    state.status = 'succeeded';
                    // adding date and reactions
                    let min = 1;
                    const loadedPosts = action.payload.map((post) => {
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                        return post;
                    });
                    // adding any fetched posts to the array
                    state.posts = state.posts.concat(loadedPosts);
                }
            )
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
