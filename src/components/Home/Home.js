import { useState, useEffect } from "react";
import { getBackgroundImages } from "../Supabase";
import "./Home.css";

function Home() {
  const [images, setImages] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initializeImages() {
      try {
        const imagesData = await getBackgroundImages();
        if (isMounted) {
          setImages(imagesData);

          if (imagesData?.length > 0) {
            const firstImage = new Image();
            firstImage.src = `https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${imagesData[0]?.name}`;
            firstImage.onload = () => {
              if (isMounted) {
                setIsLoading(false);
                setImageIndex(0);
                setIsFirstImageLoaded(true);
                const backgroundContainer = document.getElementById(
                  "background-container"
                );
                backgroundContainer.style.backgroundImage = `url(${firstImage.src})`;
                backgroundContainer.style.backgroundSize = "cover";
                backgroundContainer.style.opacity = 1; // Ensure it's fully visible
              }
            };
          }

          const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => {
              if (imagesData?.length > 0) {
                const newIndex = (prevIndex + 1) % imagesData.length;
                return newIndex;
              } else {
                return prevIndex;
              }
            });
          }, 7000);

          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error initializing images:", error);
      }
    }

    initializeImages();
    return () => {
      isMounted = false;
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.margin = "";
      document.body.style.height = "";
    };
  }, []);

  useEffect(() => {
    if (images?.length > 0 && imageIndex > 0) {
      const currentImageUrl = images[imageIndex]?.name;
      const image = new Image();
      image.src = `https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl}`;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [imageIndex, images]);

  useEffect(() => {
    if (!isLoading && isFirstImageLoaded) {
      const currentImageUrl = images[imageIndex]?.name;
      const backgroundContainer = document.getElementById(
        "background-container"
      );

      backgroundContainer.style.transition = "opacity 1s ease-out";
      backgroundContainer.style.opacity = 0;

      setTimeout(() => {
        backgroundContainer.style.backgroundImage = `url(https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl})`;
        backgroundContainer.style.backgroundSize = "cover";

        requestAnimationFrame(() => {
          backgroundContainer.style.transition = "opacity 1s ease-in";
          backgroundContainer.style.opacity = 1;
        });
      }, 1000);
    }
  }, [imageIndex, images, isLoading, isFirstImageLoaded]);

  return (
    <div className='page-container'>
      <div
        id='background-container'
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: isFirstImageLoaded ? 1 : 0, // Ensure it's fully visible if the first image is loaded
        }}
      ></div>
      <h1>Welcome to Creative Capture</h1>
      <div className='additional-links'>
        <a href='/corporate'>Corporate</a>
        <a href='/fashion'>Fashion&Beauty</a>
        <a href='/portraits'>Portraits</a>
      </div>
      <div className='spacer'></div>
      <div className='footer-homepage'>
        <a
          href={`https://www.instagram.com/mariaduchesne.cc`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Instagram
        </a>
      </div>
    </div>
  );
}

export default Home;
