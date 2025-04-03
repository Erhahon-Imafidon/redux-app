import { Outlet } from 'react-router';
import Header from './Header.tsx';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="container h-full w-full max-w-125 mx-auto">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
