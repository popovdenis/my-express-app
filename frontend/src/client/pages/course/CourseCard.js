import React from 'react';
import Rating from '../../components/Rating';

const CourseCard = ({ course }) => {
    return (
        <div className="flex items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <img
                src={course.image || '/placeholder.png'}
                alt={course.title}
                className="w-32 h-32 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                    By <span className="font-medium">{course.instructor?.firstname} {course.instructor?.lastname}</span>
                </p>
                <div className="flex items-center justify-between mt-4">
                    <Rating value={course.averageRating} />
                    <span className="font-bold text-lg">${course.price}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;