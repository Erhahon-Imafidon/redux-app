import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

        reset: (state) => {
            state.count = 0;
        },

        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount, reset } =
    counterSlice.actions;

export default counterSlice.reducer;
