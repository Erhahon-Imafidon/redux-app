import { useParams, Link } from 'react-router';
import { useAppSelector } from '../../app/hooks.ts';
import { selectPostById } from '../../features/posts/postSlice.ts';
import { selectAllPosts } from '../../features/posts/postSlice.ts';

const UsersPage = () => {
    const { userId } = useParams<{ userId: string }>();

    const user = useAppSelector((state) =>
        userId ? selectPostById(state, userId) : undefined
    );

    const postsForUser = useAppSelector((state) => {
        const allPosts = selectAllPosts(state);
        return allPosts.filter((post) => {
            console.log(post.userId);
            return post.userId === userId;
        });
    });

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return <div>UsersPage</div>;
};
export default UsersPage;
