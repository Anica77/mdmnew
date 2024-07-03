import React, { useState, useEffect } from "react";
import photo from "./IMG_4285.jpg";
import "./about.css";
import ReviewCarousel from "../reviews/ReviewCarousel";
import { getReviews } from "../Supabase";

const About = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getAllReviews() {
      const rev = await getReviews();
      if (rev) {
        setReviews(rev);
      }
    }
    getAllReviews();
  }, []);

  const reviewsFlat = reviews.flat();

  return (
    <div className='contactContainer'>
      <div className='about'>
        <div className='aboutText'>
          <h2>Maria Duchesne</h2>
          <p>
            I am a self-taught photographer specializing in portraiture, beauty,
            fashion, and product photography. With years of experience
            photographing business professionals, entrepreneurs, artists.
          </p>
          <p>
            I prefer a clean and modern style of imagery as my default approach,
            finding it the perfect starting point for bringing in clients' ideas
            and concepts into the creative process.
          </p>
          <p>
            I constantly seek to expand my skills through experimentation with
            colors, techniques, and light, which can be seen throughout my
            portfolio.
          </p>
          <a href='mailto:mduchesne@creativecaptureph.com'>
            mduchesne@creativecaptureph.com
          </a>
        </div>
        <img src={photo} alt='portrait' className='aboutImage' />
      </div>
      <div className='reviews'>
        <ReviewCarousel reviews={reviewsFlat} />
      </div>
      <div className='footer'>
        <a
          href={`https://www.instagram.com/mariaduchesne.cc`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Instagram
        </a>
        <a
          href={`https://www.linkedin.com/in/maria-romashko-duchesne-1162ab100`}
          target='_blank'
          rel='noopener noreferrer'
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default About;
