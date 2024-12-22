import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Menu = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between items-center list-none m-0 p-0">
                <li>
                    <Link to="/" className="text-white no-underline hover:underline">
                        Home
                    </Link>
                </li>
                {user ? (
                    <>
                        <li className="text-white">Welcome, {user.firstname} {user.lastname}</li>
                        <li>
                            <Link to="/my-account" className="text-white no-underline hover:underline">
                                My Account
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-white no-underline hover:underline bg-transparent border-none cursor-pointer"
                            >
                                Log Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Menu;