import { useAppSelector } from '../app/hooks.ts';
import { selectAllPosts } from '../features/posts/postSlice.ts';

const PostsList = () => {
    const posts = useAppSelector(selectAllPosts);

    const renderedPosts = posts.map((post) => (
        <article key={post.id} className="border border-white rounded-lg p-4">
            <h2 className="text-3xl">{post.title}</h2>
            <p className="text-[1.2rem] my-2">
                {post.content.substring(0, 100)}
            </p>
        </article>
    ));

    return (
        <section className="mt-10 w-full max-w-125 mx-auto space-y-5">
            <h1 className="text-5xl font-bold mb-5">Posts</h1>
            {renderedPosts}
        </section>
    );
};
export default PostsList;
