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
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/customer/account" element={
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