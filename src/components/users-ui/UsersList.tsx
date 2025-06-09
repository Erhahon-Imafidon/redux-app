import { useAppSelector } from '../../app/hooks.ts';
import { selectAllUsers } from '../../features/users/userSlice.ts';
import { Link } from 'react-router';

const UsersList = () => {
    const users = useAppSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));

    return (
        <section className="mt-10 space-y-5">
            <h2 className="text-4xl font-bold">Users</h2>
            <ul className="list-disc">{renderedUsers}</ul>
        </section>
    );
};
export default UsersList;
