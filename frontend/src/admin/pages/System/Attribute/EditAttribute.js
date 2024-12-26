import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const EditAttribute = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        attribute_code: '',
        label: '',
        options: '',
        entity_type: '',
        is_required: false,
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [entityTypes, setEntityTypes] = useState([]);

    useEffect(() => {
        const fetchEntityTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attribute_entity/`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setEntityTypes(data.entityTypes);
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch entity types');
                }
            } catch (error) {
                setError(error.message || 'Error fetching entity types');
            }
        };

        const fetchAttribute = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attributes/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        attribute_code: data.attribute.attribute_code,
                        label: data.attribute.label,
                        options: data.attribute.options.join(', '), // Преобразуем массив в строку
                        entity_type: data.attribute.entity_type,
                        is_required: data.attribute.is_required,
                    });
                } else {
                    setError(data.message || 'Failed to fetch attribute data');
                }
            } catch (error) {
                setError(error.message || 'Error fetching attribute data');
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
            options: formData.options.split(',').map(option => option.trim()), // Преобразуем строку в массив
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attributes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/admin/attributes');
            } else {
                setError(data.message || 'Failed to update the attribute');
                setMessage(null);
            }
        } catch (e) {
            setError('Error: Unable to update the attribute.' + e.message);
            setMessage(null);
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
                            <option key={index} value={entityType._id}>{entityType.entity_type_code}</option>
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
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default EditAttribute;