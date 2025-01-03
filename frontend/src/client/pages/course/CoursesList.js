import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import Filters from './Filters';
import Pagination from '../../components/Pagination';
import { useNotification } from '../../../contexts/NotificationContext';
import ClientCourseApiClient from '../../../api/ClientCourseApiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import { customerApiClient } from '../../../api/CustomerApiClient';

const CoursesList = () => {
    const { addNotification } = useNotification();
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [filters, setFilters] = useState({ title: '', level: '', category: '' });
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) query.append(`filter[${key}]`, value);
                });
                query.append('page', pagination.page);
                query.append('limit', pagination.limit);

                const data = await ClientCourseApiClient.fetchItems(query);
                setCourses(data.courses || []);
                setPagination((prev) => ({ ...prev, total: data.total || 0 }));

                const enrolledData = await customerApiClient.get('/enrollments/customer');
                if (enrolledData && enrolledData.enrollments) {
                    const enrolledIds = (enrolledData.enrollments || []).map((enrollment) => enrollment.course._id);
                    setEnrolledCourses(enrolledIds);
                } else {
                    setEnrolledCourses([]);
                }
            } catch (err) {
                addNotification('Failed to fetch enrollments', 'error');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [filters, pagination.page]);

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handleEnroll = async (courseId) => {
        try {
            await customerApiClient.post(`/enrollments/${courseId}/enroll`);
            setEnrolledCourses((prev) => [...prev, courseId]);
            addNotification('Successfully enrolled in the course!', 'success');
        } catch (err) {
            addNotification('Failed to enroll in the course', 'error');
            console.error(err);
        }
    };

    return (
        <main className="page-main" id="maincontent">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Courses</h1>
                <Filters filters={filters} setFilters={setFilters} />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                isEnrolled={enrolledCourses.includes(course._id)}
                                onEnroll={handleEnroll}
                            />
                        ))}
                    </div>
                )}
                <Pagination
                    totalItems={pagination.total}
                    itemsPerPage={pagination.limit}
                    currentPage={pagination.page}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    );
};

export default CoursesList;