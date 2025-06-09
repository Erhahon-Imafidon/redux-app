import { useParams, Link } from 'react-router';
import { useAppSelector } from '../../app/hooks.ts';
import { selectPostsByUserId } from '../../features/posts/postSlice.ts';
import { selectUserById } from '../../features/users/userSlice.ts';

const UsersPage = () => {
    const { userId } = useParams<{ userId: string }>();

    const user = useAppSelector((state) =>
        userId ? selectUserById(state, userId) : undefined
    );

    // const postsForUser = useAppSelector((state) => {
    //     const allPosts = selectAllPosts(state);
    //     return allPosts.filter((post) => {
    //         console.log(post.userId);
    //         return post.userId === userId;
    //     });
    // });

    const postsForUser = useAppSelector((state) =>
        selectPostsByUserId(state, userId)
    );

    console.log(postsForUser);

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section className="mt-10 space-y-4">
            <h2 className="text-3xl font-semibold">
                {user ? user.name : 'User name not found'}
            </h2>
            <ol className="list-decimal text-xl">{postTitles}</ol>
        </section>
    );
};
export default UsersPage;
