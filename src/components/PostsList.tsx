import { useAppSelector } from '../app/hooks.ts';

const PostsList = () => {
    const posts = useAppSelector((state) => state.posts);

    const renderedPosts = posts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ));

    return (
        <section className="mt-4 w-full max-w-125">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};
export default PostsList;
