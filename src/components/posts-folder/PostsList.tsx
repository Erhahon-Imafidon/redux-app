import { useAppSelector } from '../../app/hooks.ts';
import {
    getPostsError,
    getPostsStatus,
    selectAllPosts,
} from '../../features/posts/postSlice.ts';
import PostsExcerpt from './PostsExcerpt.tsx';

const PostsList = () => {
    const posts = useAppSelector(selectAllPosts);
    const postsStatus = useAppSelector(getPostsStatus);
    const error = useAppSelector(getPostsError);

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
        content = orderedPosts.map((post) => (
            <PostsExcerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === 'failed') {
        content = <p>{error || 'Error fetching post'}</p>;
    }

    return (
        <section className="mt-10 w-full max-w-125 mx-auto space-y-5">
            <h1 className="text-5xl font-bold mb-5">Posts</h1>
            {content}
        </section>
    );
};
export default PostsList;
