import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { formatDate } from '../../../../utils/dateUtils'
import DropdownActions from '../../../components/DropdownActions';
import ConfirmDelete from '../../../components/ConfirmDelete';

const Attributes = () => {
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attributes`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setAttributes(data.attributes);
                    setError('');
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch attributes');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttributes();
    }, []);

    const handleDelete = async () => {
        if (!selectedAttribute) {
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attributes/${selectedAttribute._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setAttributes((prevAttributes) => prevAttributes.filter(attribute => attribute._id !== selectedAttribute._id));
                setShowConfirm(false);
                setSelectedAttribute(null);
            } else {
                const errData = await response.json();
                setError(errData.message || 'Failed to delete attribute');
            }
        } catch (err) {
            setError('Error: Unable to delete attribute.' + e.message);
        }
    };

    if (loading) {
        return <p>Loading attributes...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Attributes</h1>
                <Link to="/admin/attributes/new" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    New Attribute
                </Link>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Attribute Code</th>
                    <th className="py-2 px-4 border-b">Attribute Label</th>
                    <th className="py-2 px-4 border-b">Entity Type</th>
                    <th className="py-2 px-4 border-b">Required</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {attributes.map((attribute, index) => (
                    <tr key={attribute._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                        <td className="py-2 px-4 border-b text-center">{attribute.attribute_code}</td>
                        <td className="py-2 px-4 border-b text-center">{attribute.label}</td>
                        <td className="py-2 px-4 border-b text-center">{attribute.entity_type?.entity_type_code || 'N/A'}</td>
                        <td className="py-2 px-4 border-b text-center">{attribute.is_required ? 'Yes' : 'No'}</td>
                        <td className="py-2 px-4 border-b text-center relative">
                            <DropdownActions
                                onEdit={() => navigate(`/admin/attributes/${attribute._id}`)}
                                onDelete={() => {
                                    setSelectedAttribute(attribute);
                                    setShowConfirm(true);
                                }}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showConfirm && (
                <ConfirmDelete
                    entityId={selectedAttribute._id}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default Attributes;