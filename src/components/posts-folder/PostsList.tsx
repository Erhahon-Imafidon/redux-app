import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks.ts';
import {
    getPostsError,
    getPostsStatus,
    selectAllPosts,
    fetchPosts,
} from '../../features/posts/postSlice.ts';
import PostsExcerpt from './PostsExcerpt.tsx';

const PostsList = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectAllPosts);
    const postsStatus = useAppSelector(getPostsStatus);
    const error = useAppSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => (
            <PostsExcerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section className="mt-10 w-full max-w-125 mx-auto space-y-5">
            <h1 className="text-5xl font-bold mb-5">Posts</h1>
            {content}
        </section>
    );
};
export default PostsList;
