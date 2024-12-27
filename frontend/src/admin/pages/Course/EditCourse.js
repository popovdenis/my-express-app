import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useNotification } from '../../../contexts/NotificationContext';
import { adminApiClient } from '../../../api/AdminApiClient';
import { customerApiClient } from '../../../api/CustomerApiClient';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level:  ''
    });
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await adminApiClient.get(`/courses/${id}`);
                setFormData({
                    title: data.course.title,
                    description: data.course.description,
                    duration: data.course.duration,
                    level: data.course.level,
                    image: data.course.image,
                });
                if (data.attributes && data.attributes.length) {
                    setAttributes(data.attributes);
                }
            } catch (error) {
                addNotification('Error: Unabled to update the course', 'error');
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
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let imagePath = '';
            if (image) {
                const fileData = new FormData();
                fileData.append('file', image);
                const response = await adminApiClient.post(`/uploads`, { body: fileData });
                imagePath = response.filePath;
            }
            const courseData = { ...formData, image: imagePath };
            const data = await adminApiClient.put(`/courses/${id}`, { body: courseData });

            addNotification(`The course ${data.course.title} has been updated successfully`, 'success');
            navigate('/admin/courses');
        } catch (e) {
            addNotification('Error: Unable to update the course.' + e.message, 'error');
        }
    };

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
                                if (attribute.attributeCode === 'duration') {
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
                                if (attribute.attributeCode === 'level') {
                                    return attribute.options.map((option, index) => (
                                        <option key={index}
                                                value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                    ))
                                }
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700">Current Course Image:</label>
                    {formData.image ? (
                        <img
                            src={formData.image.startsWith('http')
                                ? formData.image
                                : `${process.env.REACT_APP_API_BASE_URL}${formData.image}`}
                            alt="Course Thumbnail"
                            className="w-32 h-32 object-cover rounded border border-gray-300"
                        />
                    ) : (
                        <p className="text-gray-500">No image uploaded</p>
                    )}
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700">Course Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {loading ? "Saving..." : "Save Course"}
                </button>
                <Link to="/admin/courses"
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-3.5">Back</Link>
            </form>
        </div>
    );
};

export default EditCourse;