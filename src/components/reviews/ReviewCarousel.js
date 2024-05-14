import React, { useState } from "react";
import "./ReviewCarousel.css";

function ReviewsCarousel({ reviews }) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='reviewBody'>
      {reviews.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Reviews</h2>
          <div className='reviewContainer'>
            <button onClick={prevReview}>&#8249;</button>
            <p className='reviewText'>{reviews[currentReviewIndex].text}</p>
            <button onClick={nextReview}>&#8250;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsCarousel;
