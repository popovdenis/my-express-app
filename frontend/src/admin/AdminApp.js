import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";

const AdminApp = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;