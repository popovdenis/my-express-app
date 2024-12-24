import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AdminApp from '../admin/AdminApp';
import ProtectedRoute from "../components/ProtectedRoute";
import MyAccount from "../pages/MyAccount";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-account" element={
                <ProtectedRoute>
                    <MyAccount />
                </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
                <ProtectedRoute>
                    <AdminApp />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;