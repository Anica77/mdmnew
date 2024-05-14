import React, { useEffect, useState, useRef } from "react";
import supabase from "../Supabase";
import Masonry from "masonry-layout";
import QuoteForm from "../quoteForm/QuoteForm";
import banner from "./IMG_9075.jpg";
import "./fashion.css";

const Fashion = () => {
  const [data, setData] = useState([]);
  const gridRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const masonry = new Masonry(gridRef.current, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      gutter: 10,
      // columnWidth: 60,
      // Adjust the gap between images
    });

    return () => {
      masonry.destroy();
    };
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

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getImages();
  }, []);

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
                  src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${image.name}`}
                  alt=''
                  loading='lazy'
                />
                <div className='overlay'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fashion;
