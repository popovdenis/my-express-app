import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
    const { notifications } = useNotification();

    return (
        <div className="notification-container">
            {notifications.map(({id, message, type, isVisible}) => (
                <div
                    key={id}
                    className={`notification ${
                        type === 'success' ? 'bg-green-500 text-white' :
                            type === 'error' ? 'bg-red-500 text-white' :
                                type === 'warning' ? 'bg-yellow-500 text-black' :
                                    'bg-blue-500 text-white'
                    } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    {message}
                </div>
            ))}
        </div>
    );
};

export default Notification;