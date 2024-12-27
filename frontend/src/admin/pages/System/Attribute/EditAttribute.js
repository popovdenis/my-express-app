import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useNotification } from '../../../../contexts/NotificationContext';
import { adminApiClient } from '../../../../api/AdminApiClient';

const EditAttribute = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        attributeCode: '',
        label: '',
        options: '',
        entityType: '',
        isRequired: false,
    });
    const [loading, setLoading] = useState(true);
    const [entityTypes, setEntityTypes] = useState([]);

    useEffect(() => {
        const fetchEntityTypes = async () => {
            try {
                const data = await adminApiClient.get(`/attribute_entity`);
                setEntityTypes(data.entityTypes);
            } catch (error) {
                addNotification(error.message || 'Error fetching entity types', 'error');
            }
        };

        const fetchAttribute = async () => {
            try {
                const data = await adminApiClient.get(`/attributes/${id}`);
                setFormData({
                    attributeCode: data.attribute.attributeCode,
                    label: data.attribute.label,
                    options: data.attribute.options.join(', '),
                    entityType: data.attribute.entityType,
                    isRequired: data.attribute.isRequired,
                });
            } catch (error) {
                addNotification(error.message || 'Error fetching attribute data', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchEntityTypes();
        fetchAttribute();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            options: formData.options.split(',').map(option => option.trim()),
        };

        try {
            await adminApiClient.put(`/attributes/${id}`, { body: updatedFormData });
            addNotification(`The attribute ${formData.label} has been saved successfully`, 'success');
            navigate('/admin/attributes');
        } catch (e) {
            addNotification('Error: Unable to update the attribute.' + e.message, 'error');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p6">
            <h1 className="text-2xl font-bold mb-4">Edit Attribute</h1>
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
                            <option key={index} value={entityType._id}>{entityType.entityTypeCode}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Attribute
                </button>
                <Link to="/admin/attributes"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-3.5">Back</Link>
            </form>
        </div>
    );
};

export default EditAttribute;