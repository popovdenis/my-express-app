import React from 'react';
import { Routes, Route } from 'react-router-dom';
// General
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
// Users
import Users from './pages/User/Users';
import NewUser from './pages/User/NewUser';
import EditUser from './pages/User/EditUser';
// Courses
import Courses from './pages/Course/Courses';
import NewCourse from './pages/Course/NewCourse';
import EditCourse from './pages/Course/EditCourse';
// System
import Attributes from './pages/System/Attribute/Attributes';
import NewAttribute from './pages/System/Attribute/NewAttribute';
import EditAttribute from './pages/System/Attribute/EditAttribute';

const AdminApp = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="/dashboard" element={ <Dashboard /> } />
                    <Route path="/users" element={ <Users /> } />
                    <Route path="/users/new" element={ <NewUser /> } />
                    <Route path="/users/:id" element={ <EditUser /> } />
                    <Route path="/courses" element={ <Courses /> } />
                    <Route path="/courses/new" element={ <NewCourse /> } />
                    <Route path="/courses/:id" element={ <EditCourse /> } />
                    <Route path="/settings" element={ <Settings /> } />
                    <Route path="/attributes" element={ <Attributes /> } />
                    <Route path="/attributes/new" element={ <NewAttribute /> } />
                    <Route path="/attributes/:id" element={ <EditAttribute /> } />
                </Routes>
            </div>
        </div>
    );
};

export default AdminApp;