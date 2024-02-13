import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import { Link } from "react-router-dom";
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
    <div className='fashion_container'>
      <h2>Fashion Gallery</h2>
      <div className='fashion_packages'>
        <div id='package1'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${images[2]?.name}`}
            ></img>
            <p>Model Test 1</p>
            <p>$600</p>
            <ul>
              <li>1 hour photo shoot.</li>
              <li>Professional Hair and Make up artist.</li>
              <li>Up to 2 outfits.</li>
              <li>6 professionally retouched final images.</li>
              <li>10 color-corrected additional images.</li>
              <li>Professional editing and color grading of all images.</li>
              <li>Final images delivered digitally in just few days.</li>
              <li>
                Behind the scene video for your social media, upon request.
              </li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
        <div id='package2'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${images[1]?.name}`}
            ></img>
            <p>Model Test 2</p>
            <p>$850</p>
            <ul>
              <li>2 hour photo shoot.</li>
              <li>Studio or on location photo shoot.</li>
              <li>Professional Hair and Make up artist.</li>
              <li>Up to 4 outfits.</li>
              <li>10 professionally retouched final images.</li>
              <li>15 color-corrected additional images.</li>
              <li>Professional editing and color grading of all images.</li>
              <li>Final images delivered digitally in just few days.</li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
        <div id='package3'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${images[5]?.name}`}
            ></img>
            <p>Model Test 3</p>
            <p>$1,250</p>
            <ul>
              <li>Up to 4 hour photo day. Half a day.</li>
              <li>Studio or on location photo shoot.</li>
              <li>2 looks with professional hair and make up artist.</li>
              <li>Up to 6 outfits.</li>
              <li>20 professionally retouched final images.</li>
              <li>60 color-corrected additional images.</li>
              <li>Professional editing and color grading of all images.</li>
              <li>Final images delivered digitally in just few days.</li>
              <li>
                Behind the scene video for your social media, upon request.
              </li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
        <div id='package4'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${images[3]?.name}`}
            ></img>
            <p>Model Test 4</p>
            <p>$2,600</p>
            <ul>
              <li>Up to 8 hour photo shoot day. Full day.</li>
              <li>Studio or on location photo shoot.</li>
              <li>4 looks with professional hair and make up artist.</li>
              <li>Wardrobe stylist.</li>
              <li>Unlimited outfits.</li>
              <li>40 professionally retouched final images.</li>
              <li>All selected color-corrected images.</li>
              <li>Professional editing and color grading of all images.</li>
              <li>Final images delivered digitally in just few days.</li>
              <li>
                Behind the scene video for your social media, upon request.
              </li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
      </div>
      <div>
        <p>
          Even though every package includes hair and make up artist services,
          and we recommend it for best result, it is possible to exclude this
          service from your package, upon request.
        </p>
        <p>
          Just email us at{" "}
          <Link
            onClick={() =>
              (window.location = "mailto:quote@creativecaptureph.com")
            }
          >
            quote@creativecaptureph.com
          </Link>
        </p>
      </div>
      <div>
        <p>
          We understand that every project is unique. Email us a few words about
          your project and deadlines to get your quote at{" "}
          <Link
            onClick={() =>
              (window.location = "mailto:quote@creativecaptureph.com")
            }
          >
            quote@creativecaptureph.com
          </Link>
        </p>
      </div>
      {/* <div id='fashionphotos'>
        {images.map((image) => (
          <img
            key={image.id}
            alt=''
            style={{ height: "650px", width: "500px" }}
            src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/fashionphotos/${image.name}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Fashion;
