import React, { useEffect, useState, useRef } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import supabase, { deletePhoto, uploadPhoto } from "../Supabase";
import QuoteForm from "../quoteForm/QuoteForm";
import banner from "./33OPT.jpg";
import "./portrait.css";

const Portraits = ({ session }) => {
  const [data, setData] = useState([]);
  const [imagesLoadedState, setImagesLoadedState] = useState(false);
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
    const getImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("portraitphotos")
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

  useEffect(() => {
    if (gridRef.current) {
      const masonry = new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        gutter: 10,
      });

      const imgLoad = imagesLoaded(gridRef.current);

      imgLoad.on("progress", () => {
        masonry.layout();
      });

      imgLoad.on("done", () => {
        setImagesLoadedState(true);
      });

      return () => {
        masonry.destroy();
      };
    }
  }, [data]);

  const handleDeleteImage = async (imageName) => {
    const success = await deletePhoto("portraitphotos", imageName);
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
    const bucketName = "portraitphotos";

    const result = await uploadPhoto(bucketName, file, fileName);

    if (result) {
      setUploadStatus("File uploaded successfully!");
      setData([...data, { id: Date.now(), name: fileName }]);
    } else {
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <div className='portraits_container'>
        <div
          className='banner'
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <p className='banner-text'>Portraits</p>
        </div>
        <div className='text'>
          <p>
            Whether it’s an acting headshot, personal portrait, personal brand
            image, or family photographs, we will help you tell your story
            creatively. CreativeCapture team will work closely with you to
            capture the essence of your personality and the unique message you
            want to convey. From professional lighting and composition to
            post-production editing, we ensure every detail is perfect. Let us
            transform your vision into stunning visuals that stand out and make
            a lasting impression.
          </p>
        </div>
        <div>
          <button className='request' onClick={openModal}>
            Request a Quote
          </button>
          {showModal && (
            <QuoteForm onClose={closeModal} pagesource='Portraits' />
          )}
        </div>
        <div className='grid' ref={gridRef}>
          <div className='grid-sizer'></div>
          {data.map((image) => (
            <div className='grid-item' key={image.id}>
              <div className='image-wrapper'>
                <img
                  id={`image-${image.id}`}
                  src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/portraitphotos/${image.name}`}
                  alt=''
                  loading='lazy'
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

export default Portraits;
