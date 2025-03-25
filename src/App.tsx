import { PostsList, AddPostForm } from './components/index.ts';

const App = () => {
    return (
        <main className="container h-full">
            <AddPostForm />
            <PostsList />
        </main>
    );
};

export default App;
