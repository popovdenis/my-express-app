import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level:  ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        title: data.course.title,
                        description: data.course.description,
                        duration: data.course.duration,
                        level: data.course.level
                    });
                    if (data.attributes && data.attributes.length) {
                        setAttributes(data.attributes);
                    }
                } else {
                    setError(data.message || 'Failed to fetch course data');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate('/admin/courses');
            } else {
                const errData = await response.json();
                setError(errData.message || 'Failed to fetch course data');
            }
        } catch (e) {
            setError('Error: Unable to create course.' + e.message);
        }
    };

    if (error) {
        return <p className="text-red-500">{error.toString()}</p>;
    }

    return (
        <div className="p6">
            <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
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
                        {!loading &&
                            attributes.map((attribute) => {
                                if (attribute.attribute_code === 'duration') {
                                    return attribute.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))
                                }
                            })
                        }
                    </select>
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
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Course
                </button>
                <Link to="/admin/courses"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-3.5">Back</Link>
            </form>
        </div>
    );
};

export default EditCourse;