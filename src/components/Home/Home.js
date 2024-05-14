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
          }, 7000);

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
      const backgroundContainer = document.getElementById(
        "background-container"
      );

      // Fade out effect
      backgroundContainer.style.transition = "opacity 1s ease-out";
      backgroundContainer.style.opacity = 0;

      setTimeout(() => {
        // Change background image
        backgroundContainer.style.backgroundImage = `url(https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/homepagebackground/${currentImageUrl})`;
        backgroundContainer.style.backgroundSize = "cover";

        // Fade in effect
        requestAnimationFrame(() => {
          backgroundContainer.style.transition = "opacity 1s ease-in";
          backgroundContainer.style.opacity = 1;
        });
      }, 1000); // Wait for 1 second for fade-out effect to complete
    }
  }, [imageIndex, images, isLoading]);

  return (
    <>
      {isLoading ? <div>Loading...</div> : null}
      <div
        id='background-container'
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>
    </>
  );
}

export default Home;
