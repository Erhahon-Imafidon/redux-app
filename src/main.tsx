import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';
import App from './App.tsx';
import { fetchUsers } from './features/users/userSlice.ts';

store.dispatch(fetchUsers()); // Fetch users when the app starts

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
