import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAdmin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/admin/me`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setAdmin(data.user);
            } else {
                setAdmin(null);
            }
        } catch (error) {
            console.error('Error fetching admin:', error.message);
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    const login = () => {
        fetchAdmin();
    };

    const logout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/auth/admin/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            setAdmin(null);
            window.location.href = '/admin/signin';
        } catch (error) {
            console.error('Admin logout error:', error.message);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);