import React from 'react';

const Filters = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex gap-4 mb-6">
            <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search by title"
                className="border border-gray-300 rounded-lg p-2"
            />
            <select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-lg p-2"
            >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="middle">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
            <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-lg p-2"
            >
                <option value="">All Categories</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
            </select>
        </div>
    );
};

export default Filters;