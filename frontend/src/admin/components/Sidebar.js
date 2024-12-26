import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAdminAuth} from '../../contexts/adminAuth';

const Sidebar = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const { logout } = useAdminAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed">
            <div className="p-4 font-bold text-lg">Admin Panel</div>
            <ul className="space-y-2">
                {/* Dashboard */}
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => toggleSection('dashboard')}>
                        Dashboard
                    </button>
                    {openSection === 'dashboard' && (
                        <ul className="pl-6 bg-gray-700">
                            <li>
                                <Link to="/admin/dashboard/overview" className="block px-4 py-2 hover:bg-gray-600">
                                    Overview
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/dashboard/reports" className="block px-4 py-2 hover:bg-gray-600">
                                    Reports
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Users */}
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => toggleSection('users')}>
                        Users
                    </button>
                    {openSection === 'users' && (
                        <ul className="pl-6 bg-gray-700">
                            <li>
                                <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-600">
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/users/new" className="block px-4 py-2 hover:bg-gray-600">
                                    Add New User
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Courses */}
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => toggleSection('courses')}>
                        Courses
                    </button>
                    {openSection === 'courses' && (
                        <ul className="pl-6 bg-gray-700">
                            <li>
                                <Link to="/admin/courses" className="block px-4 py-2 hover:bg-gray-600">
                                    Manage Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/courses/new" className="block px-4 py-2 hover:bg-gray-600">
                                    Add New Course
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Settings */}
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => toggleSection('settings')}>
                        Settings
                    </button>
                    {openSection === 'settings' && (
                        <ul className="pl-6 bg-gray-700">
                            <li>
                                <Link to="/admin/settings/advanced" className="block px-4 py-2 hover:bg-gray-600">
                                    Advanced
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* System */}
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => toggleSection('system')}>
                        System
                    </button>
                    {openSection === 'system' && (
                        <ul className="pl-6 bg-gray-700">
                            <li>
                                <Link to="/admin/attributes" className="block px-4 py-2 hover:bg-gray-600">
                                    Attributes
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="px-4 py-2 hover:bg-gray-700">
                    <button className="w-full text-left bg-transparent border-none cursor-pointer"
                        onClick={handleLogout}>
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;