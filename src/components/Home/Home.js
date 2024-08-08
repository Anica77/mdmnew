import { useState, useEffect } from "react";
import { getBackgroundImages } from "../Supabase";
import "./Home.css";

function Home() {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initializeImages() {
      try {
        const imagesData = await getBackgroundImages();

        // Filter out any placeholder or non-image items
        const validImages = imagesData.filter(
          (image) => !image.name.includes(".emptyFolderPlaceholder")
        );

        if (isMounted && validImages.length > 0) {
          setImages(validImages);

          const firstImageName = validImages[0]?.name;

          if (!firstImageName) {
            console.warn("First image name is not available.");
            return;
          }

          const firstImageUrl = `https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${firstImageName}`;

          const firstImage = new Image();
          firstImage.src = firstImageUrl;
          firstImage.onload = () => {
            if (isMounted) {
              setIsFirstImageLoaded(true);
              const backgroundContainer = document.getElementById(
                "background-container"
              );
              if (backgroundContainer) {
                backgroundContainer.style.backgroundImage = `url(${firstImage.src})`;
                backgroundContainer.style.backgroundSize = "cover";
                backgroundContainer.style.opacity = 1; // Ensure it's fully visible
              }

              // Start the interval for changing images after the first image has loaded
              const intervalId = setInterval(() => {
                setImageIndex((prevIndex) => {
                  const newIndex = (prevIndex + 1) % validImages.length;
                  return newIndex;
                });
              }, 7000);

              return () => clearInterval(intervalId);
            }
          };

          firstImage.onerror = () => {
            console.error("Failed to load image:", firstImage.src);
          };
        } else {
          console.warn("No valid images found.");
        }
      } catch (error) {
        console.error("Error initializing images:", error);
      }
    }

    initializeImages();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (images.length > 0 && imageIndex > 0) {
      const currentImageUrl = images[imageIndex]?.name;
      const image = new Image();
      image.src = `https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl}`;
      image.onload = () => {
        const backgroundContainer = document.getElementById(
          "background-container"
        );
        if (backgroundContainer) {
          backgroundContainer.style.transition = "opacity 1s ease-out";
          backgroundContainer.style.opacity = 0;

          setTimeout(() => {
            backgroundContainer.style.backgroundImage = `url(${image.src})`;
            backgroundContainer.style.backgroundSize = "cover";
            backgroundContainer.style.transition = "opacity 1s ease-in";
            backgroundContainer.style.opacity = 1;
          }, 1000);
        }
      };
      image.onerror = () => {
        console.error("Failed to load image:", image.src);
      };
    }
  }, [imageIndex, images]);

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
          transition: "opacity 1s ease-in",
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
