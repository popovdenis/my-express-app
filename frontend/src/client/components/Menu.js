import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

const Menu = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between items-center list-none m-0 p-0" ref={dropdownRef}>
                <li>
                    <Link to="/" className="text-white no-underline hover:underline">
                        Home
                    </Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/courses" className="text-white no-underline hover:underline">
                                Courses
                            </Link>
                        </li>
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-white no-underline hover:underline bg-transparent border-none cursor-pointer"
                            >
                                {`Welcome, ${user.firstname} ${user.lastname}`}
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute right-0 bg-white text-black mt-2 py-2 w-48 shadow-lg rounded">
                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <Link to="/customer/account" className="no-underline text-black">
                                            My Account
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <Link to="/customer/courses" className="no-underline text-black">
                                            My Courses
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left bg-transparent border-none cursor-pointer"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-white no-underline hover:underline bg-transparent border-none cursor-pointer"
                            >
                                {`Welcome, Guest`}
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute right-0 bg-white text-black mt-2 py-2 w-48 shadow-lg rounded">
                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <Link to="/signin" className="no-underline text-black">
                                            Sign In
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <Link to="/signup" className="no-underline text-black">
                                            Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Menu;