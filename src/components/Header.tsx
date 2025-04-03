import { NavLink } from 'react-router';

const Header = () => {
    return (
        <header className=" p-4 bg-purple-700 text-white sticky top-0 left-0">
            <div className="container flex justify-between items-center">
                <h1 className="text-5xl">Redux Blog</h1>

                <nav>
                    <ul className="flex gap-x-10 text-2xl ">
                        <li>
                            <NavLink
                                to="/"
                                className="hover:underline focus:underline"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/post"
                                className="hover:underline focus:underline"
                            >
                                Post
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;
