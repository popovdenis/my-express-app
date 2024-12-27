import React, { createContext, useState, useContext, useEffect } from 'react';
import { customerApiClient } from '../../api/CustomerApiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const data = await customerApiClient.get('/customer/account');
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (userData) => setUser(userData);

    const logout = async () => {
        try {
            await customerApiClient.post('/auth/logout');
            setUser(null);
            window.location.href = '/signin';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);