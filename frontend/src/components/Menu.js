import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-around list-none m-0 p-0">
                <li>
                    <Link to="/" className="text-white no-underline hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/signin" className="text-white no-underline hover:underline">
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className="text-white no-underline hover:underline">
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link to="/signout" className="text-white no-underline hover:underline">
                        Sign Out
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;