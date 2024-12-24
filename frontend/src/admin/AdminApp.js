import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import AdminSignIn from './pages/AdminSignIn';

const AdminApp = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="/signin" element={<AdminSignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/new" element={<NewUser />} />
                    <Route path="/users/:id" element={<EditUser />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;