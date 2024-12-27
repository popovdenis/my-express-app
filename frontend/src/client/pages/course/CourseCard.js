import React from 'react';
import Rating from '../../components/Rating';

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
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
                {course.instructor && (
                    <p className="text-sm text-gray-500 mt-2">
                        By <span className="font-medium">{course.instructor?.firstname} {course.instructor?.lastname}</span>
                    </p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <Rating value={course.averageRating} />
                    <span className="font-bold text-lg">${course.price}</span>
                </div>
                {isEnrolled ? (
                    <div className="flex items-center justify-start mt-4">
                        <button
                            disabled
                            className="bg-green-500 text-white py-2 px-4 rounded font-bold w-full"
                        >
                            Enrolled
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-start mt-4">
                        <button
                            onClick={() => onEnroll(course._id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded font-bold w-full hover:bg-blue-600"
                        >
                            Enroll
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;