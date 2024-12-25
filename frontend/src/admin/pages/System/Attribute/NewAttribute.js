import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const NewAttribute = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        attribute_code: '',
        label: '',
        options: '',
        entity_type: '',
        is_required: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [entityTypes, setEntityTypes] = useState('');

    useEffect(() => {
        const fetchEntityTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attribute_entity/`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setEntityTypes(data.entityTypes);
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch entity types');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEntityTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attributes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Attribute created successfully');
                setError(null);
                setTimeout(() => navigate('/admin/attributes'), 2000);
            } else {
                setError(data.message || 'Failed to create attribute');
                setMessage(null);
            }
        } catch (e) {
            setError('Error: Unable to create attribute.' + e.message);
            setMessage(null);
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
                <div>
                    <label htmlFor="options" className="block text-gray-700">Attribute Options:</label>
                    <input
                        type="text"
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
                <div>
                    <label htmlFor="is_required" className="block text-gray-700">Required:</label>
                    <select
                        id="is_required"
                        name="is_required"
                        value={formData.is_required}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="0" selected="selected">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Attribute
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default NewAttribute;