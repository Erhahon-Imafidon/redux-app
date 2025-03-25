import { useAppSelector } from '../../app/hooks.ts';
import { selectAllUsers } from '../../features/users/userSlice.ts';

const PostAuthor = ({ userId }: { userId: string }) => {
    const users = useAppSelector(selectAllUsers);

    const author = users.find((user) => user.id === userId);

    return <span>by {author ? author.name : 'Unknown Author'}</span>;
};
export default PostAuthor;
