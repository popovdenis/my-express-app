import React, {useEffect, useRef, useState} from 'react';

const DropdownActions = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-blue-500 hover:underline"
            >
                Select
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded z-50"
                >
                    <button
                        onClick={onEdit}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default DropdownActions;