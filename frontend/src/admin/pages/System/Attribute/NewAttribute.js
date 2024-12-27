import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useNotification } from '../../../../contexts/NotificationContext';
import { adminApiClient } from '../../../../api/AdminApiClient';

const NewAttribute = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        attributeCode: '',
        label: '',
        options: '',
        entityType: '',
        isRequired: false
    });
    const [loading, setLoading] = useState(true);
    const [entityTypes, setEntityTypes] = useState('');

    useEffect(() => {
        const fetchEntityTypes = async () => {
            try {
                const data = await adminApiClient.get(`/attribute_entity/`);
                setEntityTypes(data.entityTypes);
            } catch (error) {
                addNotification(error.message || 'Failed to fetch entity types', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchEntityTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminApiClient.post(`/attributes/`, { body: formData });
            addNotification('Attribute created successfully', 'success');
            navigate('/admin/attributes');
        } catch (e) {
            addNotification(`Error: Unable to create attribute: ${e.message}`, 'error');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p6">
            <h1 className="text-2xl font-bold mb-4">Add New Attribute</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="attributeCode" className="block text-gray-700">Attribute Code:</label>
                    <input
                        type="text"
                        id="attributeCode"
                        name="attributeCode"
                        value={formData.attributeCode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="label" className="block text-gray-700">Label:</label>
                    <textarea
                        id="label"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2">
                    </textarea>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isRequired"
                        name="isRequired"
                        checked={formData.isRequired}
                        onChange={handleChange}
                        className="border-gray-300 rounded transform scale-125"
                    />
                    <label htmlFor="isRequired" className="text-gray-700">Required</label>
                </div>
                <div>
                    <label htmlFor="options" className="block text-gray-700">Attribute Options (comma-separated):</label>
                    <textarea
                        id="options"
                        name="options"
                        value={formData.options}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="entityType" className="block text-gray-700">Entity Type:</label>
                    <select
                        id="entityType"
                        name="entityType"
                        value={formData.entityType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="">Select</option>
                        {entityTypes.map((entityType, index) => (
                            <option value={entityType._id}>{entityType.entityTypeCode}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Attribute
                </button>
            </form>
        </div>
    );
};

export default NewAttribute;