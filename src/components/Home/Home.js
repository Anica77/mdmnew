import { useState, useEffect } from "react";
import { getBackgroundImages } from "../Supabase";

function Home() {
  const [images, setImages] = useState(null); // Initialize with null
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to check component mounting status

    async function initializeImages() {
      try {
        const imagesData = await getBackgroundImages();
        if (isMounted) {
          setImages(imagesData);
          setImageIndex(0);

          const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => {
              if (imagesData?.length > 0) {
                const newIndex = (prevIndex + 1) % imagesData?.length;
                console.log("New index:", newIndex);
                return newIndex;
              } else {
                return prevIndex;
              }
            });
          }, 10000);

          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error initializing images:", error);
      }
    }

    initializeImages();
    return () => {
      isMounted = false; // Cleanup on component unmount
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.margin = "";
      document.body.style.height = "";
    };
  }, []); // Depend on images for updates

  useEffect(() => {
    if (images?.length > 0) {
      const currentImageUrl = images[imageIndex]?.name;
      const image = new Image();
      image.src = `https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl}`;
      image.onload = () => {
        setIsLoading(false);
      };
    }
  }, [imageIndex, images]);

  useEffect(() => {
    if (!isLoading) {
      const currentImageUrl = images[imageIndex]?.name;
      const body = document.body;

      // Fade out effect
      body.style.transition = "background-image 1s ease-out";
      body.style.opacity = 0;

      setTimeout(() => {
        // Change background image
        body.style.backgroundImage = `url(https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl})`;

        // Fade in effect
        body.style.transition = "background-image 1s ease-in";
        body.style.opacity = 1;
      }, 1000); // Wait for 1 second for fade-out effect to complete
    }
  }, [imageIndex, images, isLoading]);

  return isLoading ? <div>Loading...</div> : null;
}

export default Home;
