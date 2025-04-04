import { Routes, Route } from 'react-router';
import {
    PostsList,
    AddPostForm,
    Layout,
    SinglePostPage,
    EditPostForm,
} from './components/index.ts';

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
            </Route>
        </Routes>
    );
};

export default App;
