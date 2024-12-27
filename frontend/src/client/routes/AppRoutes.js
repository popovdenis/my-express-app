import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CoursesList from "../pages/course/CoursesList";
import CustomerRoutes from "./CustomerRoutes";
import { ProtectedAccountRoute } from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/customer/*" element={
                <ProtectedAccountRoute>
                    <CustomerRoutes />
                </ProtectedAccountRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;