import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice.ts';
import { postsReducer, usersReducer } from '../features/index.ts';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        counter: counterSlice,
    },
});

// Infer the type of the `store` from the configuration
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
