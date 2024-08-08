import React, { useEffect, useState, useRef } from "react";
import supabase, { deletePhoto, uploadPhoto, getReviews } from "../Supabase";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "./Corporate.css";
import QuoteForm from "../quoteForm/QuoteForm";
import banner from "./IMG_5757OPT.jpg";
import ReviewCarousel from "../reviews/ReviewCarousel";

const Corporate = ({ session }) => {
  const [data, setData] = useState([]);
  const [imagesLoadedState, setImagesLoadedState] = useState(false);
  const gridRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

        setData(data);
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
      setData([...data, { id: Date.now(), name: fileName }]); // Update with new image
    } else {
      setUploadStatus("Error uploading file.");
    }
  };

  const handleImageLoad = (event) => {
    event.target.classList.add("loaded");
    console.log(`Image loaded: ${event.target.src}`);

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
            Choose from our individual or group packages tailored to fit your
            preferences. Whether you need striking headshots, vibrant business
            lifestyle shots, or coverage for corporate events, we've got you
            covered. Simply request a quote and share a few details about your
            project. While you await our prompt reply, take a moment to scroll
            through our gallery.
          </p>
          <p>
            Upon scheduling your session, you can trust that our team will
            provide comprehensive support and assistance throughout the entire
            process. From the initial shoot to the timely delivery of your final
            images, we are committed to ensuring your complete satisfaction.
          </p>
        </div>
        <div className='reviews'>
          <ReviewCarousel reviews={reviewsFlat} />
        </div>
        <div>
          <button className='request' onClick={openModal}>
            Request a Quote
          </button>
          {showModal && (
            <QuoteForm onClose={closeModal} pagesource='corporate' />
          )}
        </div>
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
                  // loading='lazy'
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
