import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MyAccount from '../pages/MyAccount';
import AdminApp from '../admin/AdminApp';
import AdminSignIn from '../admin/pages/AdminSignIn';
import {ProtectedAccountRoute} from '../components/ProtectedRoute';

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
            <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
    );
};

export default AppRoutes;