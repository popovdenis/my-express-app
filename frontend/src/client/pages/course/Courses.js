import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useNotification } from '../../../contexts/NotificationContext';
import { customerApiClient } from '../../../api/CustomerApiClient';

const AllCourses = () => {
    const [loading, setLoading] = useState(true);
    const { addNotification } = useNotification();
    const [courses, setCourses] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);

            try {
                const query = new URLSearchParams();

                query.append('page', pagination.page);
                query.append('limit', pagination.limit);

                const data = await customerApiClient.get(`/courses?${query.toString()}`);
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
    }, [pagination.page]);

    return (
        <main className="page-main" id="maincontent">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">All Courses</h2>
                <div className="course-container">
                    {/* Courses */}
                    {!loading && courses.length > 0 && (
                        <div className="flex gap-4 mb-4">
                            {courses.map((course, index) => (
                                <div className="course-card-main" key={index}>
                                    <div className="course-card-title">
                                        <h3>
                                            <Link to={`/courses/${course._id}`}
                                                  className="block px-4 py-2 text-gray-500 hover:underline">
                                                {course.title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
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
            </div>
        </main>
    )
};

export default AllCourses;