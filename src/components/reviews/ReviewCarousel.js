import React, { useState, useEffect } from "react";

const ReviewCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (lastIndex < 0) return; // No reviews available, exit early
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex); // Wrap to the last review
    } else if (currentIndex > lastIndex) {
      setCurrentIndex(0); // Wrap to the first review
    }
  }, [currentIndex, reviews]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='review-carousel'>
      {reviews.length > 0 ? (
        <>
          <div
            className='reviews'
            style={{
              display: "flex",
              width: `${reviews.length * 100}%`, // Adjust width based on number of reviews
              transition: "transform 0.5s ease",
              transform: `translateX(-${
                currentIndex * (100 / reviews.length)
              }%)`, // Adjust transform based on currentIndex
            }}
          >
            {reviews.map((review, index) => (
              <div className='review' key={index}>
                {review.text}
              </div>
            ))}
          </div>
          <button className='prev-btn' onClick={goToPrev}>
            &lt;
          </button>
          <button className='next-btn' onClick={goToNext}>
            &gt;
          </button>
        </>
      ) : (
        <div>No reviews available</div>
      )}
    </div>
  );
};

export default ReviewCarousel;
