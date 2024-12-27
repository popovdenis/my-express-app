import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { customerApiClient } from '../../api/CustomerApiClient';

export const ProtectedAccountRoute = ({ children }) => {
    const { user, setUser, loading } = useAuth();
    const [ checkingAuth, setCheckingAuth ] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const data = await customerApiClient.get('/customer/account');
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching user:', error.message);
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