import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Courses from "../pages/Courses";
import AdminApp from '../admin/AdminApp';
import { ProtectedAdminRoute } from '../admin/components/ProtectedAdminRoute';
import AdminSignIn from '../admin/pages/AdminSignIn';
import CustomerRoutes from "./CustomerRoutes";
import { ProtectedAccountRoute } from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />

            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/customer/*" element={
                <ProtectedAccountRoute>
                    <CustomerRoutes />
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