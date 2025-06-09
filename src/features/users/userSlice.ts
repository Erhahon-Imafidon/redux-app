import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export interface userStateProps {
    id: string;
    name: string;
    error: string | null;
}

const initialState: userStateProps[] = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response.data;
    } catch (error) {
        return error instanceof Error ? error.message : 'Unknown error';
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            fetchUsers.fulfilled,
            (_state, action: PayloadAction<userStateProps[]>) => {
                return action.payload;
            }
        );
    },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: string) =>
    state.users.find((user) => user.id === userId);

export default userSlice.reducer;
