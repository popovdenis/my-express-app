import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AdminApp from '../admin/AdminApp';
import AdminSignIn from '../admin/pages/AdminSignIn';
import {ProtectedAccountRoute, ProtectedAdminRoute} from "../components/ProtectedRoute";
import MyAccount from "../pages/MyAccount";

const AppRoutes = () => {
    return (
        <Routes>
            {/* General routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Sign In for Admin */}
            <Route path="/admin/signin" element={<AdminSignIn />} />

            {/* Protected routes */}
            <Route path="/my-account" element={
                <ProtectedAccountRoute>
                    <MyAccount />
                </ProtectedAccountRoute>
            } />
            <Route path="/admin/*" element={
                <ProtectedAdminRoute>
                    <AdminApp />
                </ProtectedAdminRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;