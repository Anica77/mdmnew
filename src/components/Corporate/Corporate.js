import React, { useEffect, useState, useRef } from "react";
import supabase, { deletePhoto, uploadPhoto, getReviews } from "../Supabase";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "./Corporate.css";
import banner from "./IMG_5757OPT.jpg";
import ReviewCarousel from "../reviews/ReviewCarousel";

const Corporate = ({ session }) => {
  const [data, setData] = useState([]);
  const [imagesLoadedState, setImagesLoadedState] = useState(false);
  const gridRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
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

  useEffect(() => {
    const handleImagesLoaded = () => {
      if (gridRef.current) {
        const masonry = new Masonry(gridRef.current, {
          itemSelector: ".grid-item",
          columnWidth: ".grid-sizer",
          gutter: 10,
          percentPosition: true,
        });

        masonry.layout();

        return () => {
          masonry.destroy();
        };
      }
    };

    if (gridRef.current) {
      imagesLoaded(gridRef.current, { background: true }, handleImagesLoaded);
    }
  }, [data]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("corporatephotos")
          .list();

        if (error) {
          throw error;
        }

        // Filter out empty or placeholder files
        const validImages = data.filter(
          (image) => image.name !== ".emptyFolderPlaceholder"
        );

        setData(validImages);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getImages();
  }, []);

  const handleDeleteImage = async (imageName) => {
    const success = await deletePhoto("corporatephotos", imageName);
    if (success) {
      setData(data.filter((image) => image.name !== imageName));
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const bucketName = "corporatephotos";

    const result = await uploadPhoto(bucketName, file, fileName);

    if (result) {
      setUploadStatus("File uploaded successfully!");
      setData([...data, { id: Date.now(), name: fileName }]);
    } else {
      setUploadStatus("Error uploading file.");
    }
  };

  const handleImageLoad = (event) => {
    if (event.target.complete && event.target.naturalHeight !== 0) {
      event.target.classList.add("loaded");
    } else {
      console.error(`Image failed to load: ${event.target.src}`);
      event.target.src = "fallback-image-url";
    }

    const allImagesLoaded = Array.from(
      gridRef.current.querySelectorAll("img")
    ).every((img) => img.classList.contains("loaded"));

    if (allImagesLoaded) {
      console.log("All images loaded");
      setImagesLoadedState(true);
    }
  };

  return (
    <div>
      <div className='corporate_container'>
        <div className='banner' style={{ backgroundImage: `url(${banner})` }}>
          <p className='banner-text'>Business</p>
        </div>
        <div className='text'>
          <p>
            Whether you need impactful headshots, dynamic business lifestyle
            images, or corporate event coverage, we’re here to help. As soon as
            you book your session, you can rely on our team for full support
            throughout the process. From the initial shoot to the timely
            delivery of your final images, your positive experience is our top
            priority.
          </p>
          <p>
            We offer a variety of packages, including professional headshots,
            corporate packages for teams, and event photography. Just request a
            quote and provide a few details about your project. While we work on
            your quote, feel free to browse our gallery or read what our clients
            have shared.
          </p>
        </div>
        <div className='reviews'>
          <ReviewCarousel reviews={reviewsFlat} />
        </div>
        <a className='request' href='mailto:info@creativecaptureph.com'>
          Request a Quote
        </a>
        <div
          className={`grid ${imagesLoadedState ? "images-loaded" : ""}`}
          ref={gridRef}
        >
          <div className='grid-sizer'></div>
          {data.map((image) => (
            <div className='grid-item' key={image.id}>
              <div className='image-wrapper'>
                <img
                  id={`image-${image.id}`}
                  src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${image.name}`}
                  alt=''
                  onLoad={handleImageLoad}
                />
                {session && (
                  <button
                    className='delete-button'
                    onClick={() => handleDeleteImage(image.name)}
                  >
                    X
                  </button>
                )}
                <div className='overlay'></div>
              </div>
            </div>
          ))}
        </div>
        {session && (
          <div className='uploadPhoto'>
            <input type='file' onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Corporate;
