import React from 'react';
import { NavLink } from 'react-router-dom';
import {useAdminAuth} from '../../contexts/adminAuth';

const Sidebar = () => {
    const links = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/users', label: 'Users' },
        { path: '/admin/courses', label: 'Courses' },
        { path: '/admin/settings', label: 'Settings' },
    ];
    const { logout } = useAdminAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed">
            <div className="p-4 text-lg font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="mt-4">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({isActive}) =>
                                    `block px-4 py-2 rounded hover:bg-gray-700 ${
                                        isActive ? 'bg-gray-700' : ''
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                    <li className="px-4 py-2 hover:bg-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left bg-transparent border-none cursor-pointer"
                        >
                            Log Out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;