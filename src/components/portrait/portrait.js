import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import "./portrait.css";

const Portrait = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getMedia() {
      const { data, error } = await supabase.storage
        .from("portraitphotos")
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
      <h2>Portraits Gallery</h2>
      <div id='portraitphotos'>
        {images.map((image) => (
          <img
            key={image.id}
            alt=''
            style={{ height: "650px", width: "500px" }}
            src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/portraitphotos/${image.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Portrait;
