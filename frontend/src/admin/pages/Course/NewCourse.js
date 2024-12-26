import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const NewCourse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level: ''
    });
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchCourseAttributes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/attribute_entity/course`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setAttributes(data.attributes);
                } else {
                    setError(data.message || 'Failed to fetch course data');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseAttributes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.level) newErrors.level = 'Level is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return false;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Course created successfully');
                setError(null);
                setTimeout(() => navigate('/admin/courses'), 2000);
            } else {
                setError(data.message || 'Failed to create course');
                setMessage(null);
            }
        } catch (e) {
            setError('Error: Unable to create course.' + e.message);
            setMessage(null);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                    {errors.title && <p className="mt-1 text-red-500">{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2">
                    </textarea>
                </div>
                <div>
                    <label htmlFor="duration" className="block text-gray-700">Duration:</label>
                    <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="">Select</option>
                        {!loading &&
                            attributes.map((attribute) => {
                                if (attribute.attribute_code === 'duration') {
                                    return attribute.options.map((option, index) => (
                                        <option key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                    ))
                                }
                            })
                        }
                    </select>
                    {errors.duration && <p className="mt-1 text-red-500">{errors.duration}</p>}
                </div>
                <div>
                <label htmlFor="level" className="block text-gray-700">Level:</label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="">Select</option>
                        {!loading &&
                            attributes.map((attribute) => {
                                if (attribute.attribute_code === 'level') {
                                    return attribute.options.map((option, index) => (
                                        <option key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                    ))
                                }
                            })
                        }
                    </select>
                    {errors.level && <p className="mt-1 text-red-500">{errors.level}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Course
                </button>
                <Link to="/admin/courses"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-3.5">Back</Link>
            </form>
        </div>
    );
};

export default NewCourse;