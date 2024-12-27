import React, { useState } from 'react';
import { adminApiClient } from '../api/AdminApiClient';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            const response = await adminApiClient.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(response.filePath);
            setFile(null);
        } catch (err) {
            setError('Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-upload">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded p-2 mb-2"
            />
            {file && (
                <div>
                    <p>Selected file: {file.name}</p>
                    <button
                        onClick={handleUpload}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default FileUpload;