import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {useAdminAuth} from '../../contexts/adminAuth';

export const ProtectedAdminRoute = ({ children }) => {
    const { user, setUser, loading } = useAdminAuth();
    const [ checkingAuth, setCheckingAuth ] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/admin/me`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                    // window.location.href = '/signin';
                }
            } catch (error) {
                // console.error('Error fetching user:', error.message);
            } finally {
                setCheckingAuth(false);
            }
        };
        verifyAuth();
    }, [setUser]);

    if (loading || checkingAuth) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
};