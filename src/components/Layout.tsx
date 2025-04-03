import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <main className="container h-full w-full max-w-125 mx-auto">
            <Outlet />
        </main>
    );
};

export default Layout;
