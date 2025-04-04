import { useParams, Link } from 'react-router';
import { useAppSelector } from '../../app/hooks.ts';
import { selectPostById } from '../../features/posts/postSlice.ts';
import PostAuthor from './PostAuthor.tsx';
import ReactionButtons from './ReactionButtons.tsx';
import TimeAgo from './TimeAgo.tsx';

const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();

    const post = useAppSelector((state) =>
        postId ? selectPostById(state, postId) : undefined
    );

    if (!post) {
        return (
            <section className="w-full max-w-125 mx-auto mt-20">
                <h2 className="text-4xl font-bold">Post Not Found</h2>
            </section>
        );
    }

    return (
        <article className="border border-black rounded-xl p-4 mt-10">
            <h2 className="text-3xl">{post.title}</h2>
            <p className="text-[1.2rem] my-2 italic">{post.content}</p>
            <p className="text-base">
                <Link
                    to={`/post/edit/${post.id}`}
                    className="mr-1 underline hover:opacity-75 focus:opacity-75"
                >
                    Edit Post
                </Link>
                <PostAuthor userId={post.userId || ''} />
                <TimeAgo timestamp={post.date || ''} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};
export default SinglePostPage;
