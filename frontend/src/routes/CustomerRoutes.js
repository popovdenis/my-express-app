import { Routes, Route } from 'react-router-dom';
import React from "react";
import MyAccount from "../pages/Customer/MyAccount";
import MyCourses from "../pages/Customer/MyCourses";


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