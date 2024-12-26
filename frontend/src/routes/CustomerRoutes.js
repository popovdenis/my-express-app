import { Routes, Route } from 'react-router-dom';
import React from "react";
import MyAccount from "../pages/MyAccount";


const AdminApp = () => {
    return (
        <>
            <Routes>
                <Route path="/account" element={<MyAccount />} />
            </Routes>
        </>
    )
};

export default AdminApp;