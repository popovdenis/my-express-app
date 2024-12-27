import React from 'react';

const Rating = ({ rating, maxRating = 5 }) => {
    const parsedRating = Number(rating);
    const parseMaxRating = Number(maxRating);

    if (isNaN(parsedRating) || isNaN(parsedRating)) {
        return null;
    }

    const validRating = Math.min(Math.max(rating, 0), maxRating);

    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="rating-container">
            {/* Full rating */}
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="star full">&#9733;</span>
            ))}
            {/* Half of the rating */}
            {hasHalfStar && (
                <span className="star half">
                    &#9733;<span className="half-overlay">&#9733;</span>
                </span>
            )}
            {/* Empty rating */}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="star empty">&#9734;</span>
            ))}
        </div>
    );
};

export default Rating;