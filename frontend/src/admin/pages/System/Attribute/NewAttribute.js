import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useNotification } from '../../../../contexts/NotificationContext';

const NewAttribute = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        attribute_code: '',
        label: '',
        options: '',
        entity_type: '',
        is_required: false
    });
    const [loading, setLoading] = useState(true);
    const [entityTypes, setEntityTypes] = useState('');

    useEffect(() => {
        const fetchEntityTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_ADMIN_URL}/attribute_entity/`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setEntityTypes(data.entityTypes);
                } else {
                    addNotification(data.message || 'Failed to fetch entity types', 'error');
                }
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
            const response = await fetch(`${process.env.REACT_APP_API_ADMIN_URL}/attributes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                addNotification('Attribute created successfully', 'success');
                navigate('/admin/attributes');
            } else {
                addNotification(data.message || 'Failed to create attribute', 'error');
            }
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
                    <label htmlFor="attribute_code" className="block text-gray-700">Attribute Code:</label>
                    <input
                        type="text"
                        id="attribute_code"
                        name="attribute_code"
                        value={formData.attribute_code}
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
                        id="is_required"
                        name="is_required"
                        checked={formData.is_required}
                        onChange={handleChange}
                        className="border-gray-300 rounded transform scale-125"
                    />
                    <label htmlFor="is_required" className="text-gray-700">Required</label>
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
                    <label htmlFor="entity_type" className="block text-gray-700">Entity Type:</label>
                    <select
                        id="entity_type"
                        name="entity_type"
                        value={formData.entity_type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="">Select</option>
                        {entityTypes.map((entityType, index) => (
                            <option value={entityType._id}>{entityType.entity_type_code}</option>
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