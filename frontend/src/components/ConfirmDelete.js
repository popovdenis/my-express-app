import React from 'react';

const ConfirmDelete = ({ entity, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete <strong>{entity?.title || 'this item'}</strong>?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;