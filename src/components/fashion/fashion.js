import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import "./fashion.css";

const Fashion = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getMedia() {
      const { data, error } = await supabase.storage
        .from("fashionphotos")
        .list();
      if (data) {
        setImages(data);
      } else {
        console.log(71, error);
      }
    }
    getMedia();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Fashion Gallery</h2>
      <div id='fashionphotos'>
        {images.map((image) => (
          <img
            key={image.id}
            alt=''
            style={{ height: "650px", width: "500px" }}
            src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${image.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Fashion;
