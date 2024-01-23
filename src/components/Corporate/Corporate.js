import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const Corporate = () => {
  const supabaseUrl = process.env.REACT_APP_DATABASE_URL;
  const supabaseKey = process.env.REACT_APP_DATABASE_ANOK;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getMedia() {
      const { data, error } = await supabase.storage
        .from("corporatephotos")
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
      <h2>Corporate Gallery</h2>
      <div id='corporatephotos'>
        {images.map((image) => (
          <img
            key={image.id}
            alt=''
            src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${image.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Corporate;
