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

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    return (
        <section className="mt-10 w-full max-w-125 mx-auto space-y-5">
            <h1 className="text-5xl font-bold mb-5">Posts</h1>
            {renderedPosts}
        </section>
    );
};
export default PostsList;
