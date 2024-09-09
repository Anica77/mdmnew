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
          <p className='Reviews'>Reviews</p>
          <div className='reviewContainer'>
            <button className='prev' onClick={prevReview}></button>
            <p className='reviewText'>{reviews[currentReviewIndex].text}</p>
            <button className='next' onClick={nextReview}></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsCarousel;
