import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/dateUtils';
import DropdownActions from '../../components/DropdownActions';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useNotification } from '../../../contexts/NotificationContext';
import { adminApiClient } from '../../../api/AdminApiClient';

const Courses = () => {
    const { addNotification } = useNotification();
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({ title: '', level: ''});
    const [sort, setSort] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();
    const titleInputRef = useRef(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams();

                if (filters.title) query.append('filter[title]', filters.title);
                if (filters.level) query.append('filter[level]', filters.level);
                if (sort) query.append('sort', sort);

                query.append('page', pagination.page);
                query.append('limit', pagination.limit);

                const data = await adminApiClient.get(`/courses?${query.toString()}`);
                if (Array.isArray(data.courses)) {
                    setCourses(data.courses);
                    setPagination((prev) => ({
                        ...prev,
                        total: data.total,
                        pages: data.pages,
                    }));
                } else {
                    addNotification(data.message || 'Failed to fetch courses', 'error');
                }
            } catch (err) {
                console.log(err);
                addNotification('Failed to fetch courses', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [filters, sort, pagination.page]);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPagination((prev) => ({...prev, page: 1}));
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPagination((prev) => ({...prev, page: 1}));
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handleDelete = async () => {
        if (!selectedCourse) {
            return;
        }
        try {
            await adminApiClient.delete(`/courses/${selectedCourse._id}`);
            setCourses((prevCourses) => prevCourses.filter(course => course._id !== selectedCourse._id));
            setShowConfirm(false);
            setSelectedCourse(null);
        } catch (err) {
            addNotification('Error: Unable to delete course.' + e.message, 'error');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Courses</h1>
            </div>
            <div className="flex justify-end items-center mb-4">
                <Link to="/admin/courses/new"
                      className="bg-red-500 text-white py-2 px-4 rounded font-bold hover:bg-red-700">
                    New Course
                </Link>
            </div>
            <div className="flex justify-between items-center mb-4">
                {/* Filters */}
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        name="title"
                        ref={titleInputRef}
                        placeholder="Search by title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="flex gap-4">
                    {/* Sorting */}
                    <select
                        name="level"
                        value={filters.level}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded p-2">
                        <option value="">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="middle">Middle</option>
                        <option value="proficient">Proficient</option>
                        <option value="expert">Expert</option>
                    </select>
                    <select
                        name="sort"
                        value={sort}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded p-2">
                        <option value="">Sort By</option>
                        <option value="title_asc">Title (A-Z)</option>
                        <option value="title_desc">Title (Z-A)</option>
                        <option value="level_asc">Level (A-Z)</option>
                        <option value="level_desc">Level (Z-A)</option>
                        <option value="duration_asc">Duration (A-Z)</option>
                        <option value="duration_desc">Duration (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* Loading */}
            {loading && <p className="text-blue-500">Loading courses...</p>}

            {/* Courses */}
            {!loading && courses.length > 0 && (
                <>
                    <div className="flex gap-4 mb-4">
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
                    </div>
                    {showConfirm && (
                        <ConfirmDelete
                            entityId={selectedCourse._id}
                            onClose={() => setShowConfirm(false)}
                            onConfirm={handleDelete}
                        />
                    )}
                </>
            )}

            {/* Empty State */}
            {!loading && courses.length === 0 && <p className="text-gray-500">No courses found</p>}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({length: pagination.pages}, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border ${pagination.page === i + 1 ? 'bg-gray-300 text-black' : 'ml-0.5'}`}>{i + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Courses;