import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CounterState {
    count: number;
}

// Define the initial state using that type
const initialState: CounterState = {
    count: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },

        decrement: (state) => {
            state.count -= 1;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
