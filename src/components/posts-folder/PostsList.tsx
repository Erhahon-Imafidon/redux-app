import { useAppSelector } from '../../app/hooks.ts';
import { selectAllPosts } from '../../features/posts/postSlice.ts';
import PostAuthor from './PostAuthor.tsx';
import TimeAgo from './TimeAgo.tsx';
import ReactionButtons from './ReactionButtons.tsx';

const PostsList = () => {
    const posts = useAppSelector(selectAllPosts);

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id} className="border border-white rounded-lg p-4">
            <h2 className="text-3xl">{post.title}</h2>
            <p className="text-[1.2rem] my-2">
                {post.content.substring(0, 100)}
            </p>
            <p className="text-base">
                <PostAuthor userId={post.userId || ''} />
                <TimeAgo timestamp={post.date || ''} />
            </p>
            <ReactionButtons post={post} />
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
