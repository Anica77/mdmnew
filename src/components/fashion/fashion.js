import React, { useEffect, useState, useRef } from "react";
import supabase, { deletePhoto, uploadPhoto } from "../Supabase";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "./fashion.css";
import banner from "./IMG_9075OPT.jpg";

const Fashion = ({ session }) => {
  const [data, setData] = useState([]);
  const [imagesLoadedState, setImagesLoadedState] = useState(false);
  const gridRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const handleImagesLoaded = () => {
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
    };

    if (gridRef.current) {
      imagesLoaded(gridRef.current, handleImagesLoaded);
    }
  }, [data]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("fashionphotos")
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

  const handleImageLoad = (event) => {
    event.target.classList.add("loaded");
    const allImagesLoaded = Array.from(
      gridRef.current.querySelectorAll("img")
    ).every((img) => img.classList.contains("loaded"));

    if (allImagesLoaded) {
      setImagesLoadedState(true);
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
          <p className='banner-text'>Fashion</p>
        </div>
        <div className='text'>
          <p>
            Bringing fashion and brand essence to life with elegance and
            clarity, we offer a range of services, including product and brand
            photography, look books, videography, modeling tests, and
            portfolio-building sessions for models of all levels. Supported by
            our talented hair and makeup stylists, as well as our expert
            production and post-production team, we are dedicated to ensuring
            our clients’ best interests are kept in mind throughout the entire
            process.
          </p>
          <div className='requestF'>
            <p>
              We understand that each project is unique. Email us describing
              your project or request a phone call and we will be able to create
              a quote specifically for your project.
            </p>
            <a href='mailto:info@creativecaptureph.com'>
              info@creativecaptureph.com
            </a>
          </div>
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
