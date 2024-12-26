import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'success', timeout = 3000) => {
        const id = Date.now();
        const expiration = Date.now() + timeout;

        setNotifications((prev) => [
            ...prev,
            { id, message, type, expiration, isVisible: true },
        ]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.expiration - 1000 <= now
                        ? { ...notification, isVisible: false }
                        : notification
                ).filter((notification) => notification.expiration > now)
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};