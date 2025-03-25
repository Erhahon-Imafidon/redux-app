import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store.ts';

export interface PostSliceState {
    id: string;
    title: string;
    content: string;
}

const initialState: PostSliceState[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Redux Toolkit is the recommended way to write Redux logic.',
    },

    {
        id: '2',
        title: 'Slices...',
        content: 'The more I slice, the more I learn about Redux.',
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
            prepare(title: string, content: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                    },
                };
            },
        },
    },
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { postsAdded } = postsSlice.actions;

export default postsSlice.reducer;
