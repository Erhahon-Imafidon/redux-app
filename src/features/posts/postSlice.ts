import { createSlice } from '@reduxjs/toolkit';

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
        title: 'Slices',
        content: 'The more I slice, the more I learn about Redux.',
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
});

export default postsSlice.reducer;
