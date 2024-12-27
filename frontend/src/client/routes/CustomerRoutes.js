import React from "react";
import { Routes, Route } from 'react-router-dom';
import MyAccount from "../pages/customer/MyAccount";
import MyCourses from "../pages/customer/MyCourses";


const AdminApp = () => {
    return (
        <>
            <Routes>
                <Route path="/account" element={<MyAccount />} />
                <Route path="/courses" element={<MyCourses />} />
            </Routes>
        </>
    )
};

export default AdminApp;