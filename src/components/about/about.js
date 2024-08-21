import React, { useState, useEffect } from "react";
import photo from "./IMG_4285OPT.jpg";
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
            I am a self-taught photographer with years of experience
            specializing in portraiture, beauty, fashion, product, and food
            photography. My work with business professionals, entrepreneurs,
            creatives, and events has honed my expertise. I favor a clean and
            modern style, which serves as an ideal foundation for incorporating
            clients’ ideas and concepts into the creative process.
          </p>
          <p>
            I work alongside a dedicated team of professionals, ensuring that
            every project is executed with precision and creativity. Constantly
            striving to expand my skills, I experiment with colors, techniques,
            and lighting—a passion that is evident throughout my portfolio.
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
          href={`https://www.linkedin.com/in/creative-capture-7479a2321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app`}
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
