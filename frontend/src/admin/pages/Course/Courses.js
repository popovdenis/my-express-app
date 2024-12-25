import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { formatDate } from '../../../utils/dateUtils'
import DropdownActions from '../../components/DropdownActions';
import ConfirmDelete from '../../components/ConfirmDelete';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses);
                    setError('');
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch courses');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async () => {
        if (!selectedCourse) {
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses/${selectedCourse._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setCourses((prevCourses) => prevCourses.filter(course => course._id !== selectedCourse._id));
                setShowConfirm(false);
                setSelectedCourse(null);
            } else {
                const errData = await response.json();
                setError(errData.message || 'Failed to delete course');
            }
        } catch (err) {
            setError('Error: Unable to delete course.' + e.message);
        }
    };

    if (loading) {
        return <p>Loading courses...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Courses</h1>
                <Link to="/admin/courses/new"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    New Course
                </Link>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Duration</th>
                    <th className="py-2 px-4 border-b">Level</th>
                    <th className="py-2 px-4 border-b">Created At</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course, index) => (
                    <tr key={course._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                        <td className="py-2 px-4 border-b text-center">{course.title}</td>
                        <td className="py-2 px-4 border-b text-center">{course.duration}</td>
                        <td className="py-2 px-4 border-b text-center">{course.level}</td>
                        <td className="py-2 px-4 border-b text-center">{formatDate(course.createdAt)}</td>
                        <td className="py-2 px-4 border-b text-center relative">
                            <DropdownActions
                                onEdit={() => navigate(`/admin/courses/${course._id}`)}
                                onDelete={() => {
                                    setSelectedCourse(course);
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
                    entityId={selectedCourse._id}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default Courses;