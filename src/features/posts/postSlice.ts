import {
    createSlice,
    nanoid,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store.ts';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

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
    error: boolean | null;
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
});

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
