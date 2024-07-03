import React, { useEffect, useState, useRef } from "react";
import supabase, { deletePhoto, uploadPhoto } from "../Supabase";
import Masonry from "masonry-layout";
import "./fashion.css";
import QuoteForm from "../quoteForm/QuoteForm";
import banner from "./IMG_9075.jpg";

const Fashion = ({ session }) => {
  const [data, setData] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const gridRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (gridRef.current) {
      const masonry = new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        gutter: 10,
      });

      masonry.layout();

      return () => {
        masonry.destroy();
      };
    }
  }, [imagesLoaded, data]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("fashionphotos")
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
    const success = await deletePhoto("fashionphotos", imageName);
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
    const bucketName = "fashionphotos";

    const result = await uploadPhoto(bucketName, file, fileName);

    if (result) {
      setUploadStatus("File uploaded successfully!");
      setData([...data, { id: Date.now(), name: fileName }]);
    } else {
      setUploadStatus("Error uploading file.");
    }
  };

  const handleImageLoad = () => {
    // Check if all images have been loaded
    const allImagesLoaded = data.every((image) => {
      return document.getElementById(`image-${image.id}`).complete;
    });

    if (allImagesLoaded) {
      setImagesLoaded(true);
    }
  };

  return (
    <div>
      <div className='fashion_container'>
        <div
          className='banner'
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <p className='banner-text'>Fashion & Beauty</p>
        </div>
        <div className='text'>
          {console.log("session from fashion", session)}
          <p>
            Choose from our individual or group packages tailored to fit your
            preferences. Whether you need striking headshots, vibrant business
            lifestyle shots, or coverage for corporate events, we've got you
            covered. Simply request a quote and share a few details about your
            project. While you await our prompt reply, take a moment to scroll
            through our gallery.
          </p>
          <p>
            {" "}
            Upon scheduling your session, you can trust that our team will
            provide comprehensive support and assistance throughout the entire
            process. From the initial shoot to the timely delivery of your final
            images, we are committed to ensuring your complete satisfaction.
          </p>
        </div>
        <div>
          <button onClick={openModal}>Request a Quote</button>
          {showModal && (
            <QuoteForm onClose={closeModal} pagesource='Fashion&Beauty' />
          )}
        </div>
        <div className='grid' ref={gridRef}>
          <div className='grid-sizer'></div>
          {data.map((image) => (
            <div className='grid-item' key={image.id}>
              <div className='image-wrapper'>
                <img
                  id={`image-${image.id}`}
                  src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${image.name}`}
                  alt=''
                  loading='lazy'
                  onLoad={handleImageLoad} // Call handleImageLoad when image is loaded
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
            <h2>Upload Image</h2>
            <input type='file' onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fashion;
