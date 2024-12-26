import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/dateUtils';
import DropdownActions from '../../components/DropdownActions';
import ConfirmDelete from '../../components/ConfirmDelete';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({ title: '', level: ''});
    const [sort, setSort] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();
    const titleInputRef = useRef(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams();

                if (filters.title) query.append('filter[title]', filters.title);
                if (filters.level) query.append('filter[level]', filters.level);
                if (sort) query.append('sort', sort);

                query.append('page', pagination.page);
                query.append('limit', pagination.limit);

                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/courses?${query.toString()}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                if (response.ok && Array.isArray(data.courses)) {
                    setCourses(data.courses);
                    setPagination((prev) => ({
                        ...prev,
                        total: data.total,
                        pages: data.pages,
                    }));
                } else {
                    setError(data.message || 'Failed to fetch courses');
                }
            } catch (err) {
                console.log(err);
                setError('Failed to fetch courses');
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
            {/* Filters */}
            <div className="flex gap-4 mb-4">
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
            {/* Sorting */}
            <div className="flex gap-4 mb-4">
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
            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Empty State */}
            {!loading && courses.length === 0 && <p className="text-gray-500">No courses found</p>}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({length: pagination.pages}, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border ${pagination.page === i + 1 ? 'bg-blue-500 text-white' : 'ml-0.5'}`}>{i + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Courses;