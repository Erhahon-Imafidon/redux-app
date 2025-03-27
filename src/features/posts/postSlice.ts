import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
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

export interface ReactionPayload {
    postId: string;
    reaction: keyof PostSliceState['reactions'];
}

const initialState: PostSliceState[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Redux Toolkit is the recommended way to write Redux logic.',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },

    {
        id: '2',
        title: 'Slices...',
        content: 'The more I slice, the more I learn about Redux.',
        userId: '1',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsAdded: {
            reducer(state, action: PayloadAction<PostSliceState>) {
                state.push(action.payload);
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
            const existingPost = state.find((post) => post.id === postId);
            if (existingPost && existingPost.reactions) {
                existingPost.reactions[reaction]++;
            }
        },
    },
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
