import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface userState {
    id: string;
    name: string;
}

const initialState: userState[] = [
    {
        id: '0',
        name: 'Erhahon  Imafidon',
    },
    {
        id: '1',
        name: 'Nosa  Okhuelegbe',
    },
    {
        id: '2',
        name: 'Stella Itua',
    },
];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default userSlice.reducer;
