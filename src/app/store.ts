import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice.ts';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        counter: counterSlice,
    },
});

// Infer the type of the `store` from the configuration
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
