import { Routes, Route, Navigate } from 'react-router';
import {
    PostsList,
    AddPostForm,
    Layout,
    SinglePostPage,
    EditPostForm,
} from './components/index.ts';

import { UsersPage, UsersList } from './components/users-ui/index.ts';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />
                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>

                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UsersPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default App;
