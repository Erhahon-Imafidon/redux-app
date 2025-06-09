import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router';
import { store } from './app/store.ts';
import './index.css';
import App from './App.tsx';
import { fetchUsers } from './features/users/userSlice.ts';
import { fetchPosts } from './features/posts/postSlice.ts';

store.dispatch(fetchPosts()); // Fetch users when the app starts
store.dispatch(fetchUsers()); // Fetch posts when the app starts

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
