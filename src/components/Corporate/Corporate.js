import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import "./Corporate.css";

const Corporate = () => {
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
      {/* <div id='corporatephotos'>
        {images.map((image) => (
          <img
          key={image.id}
          alt=''
          style={{ height: "650px", width: "500px" }}
          src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${image.name}`}
          />
          ))}
        </div> */}
      <div className='corporate_container'>
        <h2>Business</h2>
        <div className='corporate_packages'>
          <div id='package1'>
            <div className='innerbox_package'>
              <img
                alt=''
                style={{ height: "450px", width: "300px" }}
                src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[7]?.name}`}
              ></img>
              <p>Individual Professional Headshot Package 1</p>
              <p>$400</p>
              <ul>
                <li>30 min studio photo session.</li>
                <li>1 outfit.</li>
                <li>3 professionally retouched images.</li>
                <li>5 complementary color-corrected images.</li>
                <li>Delivered digitally in just few days.</li>
              </ul>
              <button>ADD Hair and Make up Artist</button>
              <p>
                Available upon request at least 48 Hours prior to your shoot.
              </p>
              {/* Adding quantity button later */}
              <button>Add additional images</button>
              <p>$25 per image</p>
              <button>Purchase</button>
            </div>
          </div>
          <div id='package2'>
            <div className='innerbox_package'>
              <img
                alt=''
                style={{ height: "450px", width: "300px" }}
                src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[1]?.name}`}
              ></img>
              <p>Individual Professional Headshot Package 2</p>
              <p>$600</p>
              <ul>
                <li>1 hour studio photo session.</li>
                <li>2 outfits.</li>
                <li>Professional Hair and Make up Artist</li>
                <li>6 professionally retouched images.</li>
                <li>5 complementary color-corrected images.</li>
                <li>Final images delivered digitally in just few days.</li>
              </ul>
              {/* Adding quantity button later */}
              <button>Add additional images</button>
              <p>$25 per image</p>
              <button>Purchase</button>
            </div>
          </div>
          <div id='package3'>
            <div className='innerbox_package'>
              <img
                alt=''
                style={{ height: "450px", width: "300px" }}
                src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[5]?.name}`}
              ></img>
              <p>Professional Headshot Package 3</p>
              <p>$1150</p>
              <ul>
                <li>3 hours in studio or on location photo session.</li>
                <li>Up to 4 outfits.</li>
                <li>2 lookswith professional Hair and Make up Artist.</li>
                <li>12 professionally retouched images.</li>
                <li>10 complementary color-corrected images.</li>
                <li>Final images delivered digitally in just few days.</li>
              </ul>
              {/* Adding quantity button later */}
              <button>Add additional images</button>
              <p>$25 per image</p>
              <button>Purchase</button>
            </div>
          </div>
        </div>
        <div>
          <p>
            Choose you own images in the studio or delegate this task to our
            photographer with years of experience taking professional headshots
            in New York Metropolitan Area.
          </p>
          <p>
            Request customed quote email@creativecaptureph.com Email us few
            words about your project and deadlines.
          </p>
        </div>
      </div>
      <h2>Company Packages</h2>
      <div className='corporate_packages'>
        <div id='package1'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[4]?.name}`}
            ></img>
            <p>Company Package 1</p>
            <p>$1,650</p>
            <ul>
              <li>UP TO 10 people team.</li>
              <li>On location or in studio photo shoot.</li>
              <li>Up to 2 hours.</li>
              <li>1 professionally retouched image per person.</li>
              <li>Color-corrected group and action shots.</li>
              <li>Professional equipment and background.</li>
              <li>Final images delivered digitally in less than a week.</li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
        <div id='package2'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[2]?.name}`}
            ></img>
            <p>Company Package 2</p>
            <p>$2,400</p>
            <ul>
              <li>UP TO 30 people team.</li>
              <li>On location photo shoot.</li>
              <li>Up to 4 hours.</li>
              <li>1 professionally retouched image per person.</li>
              <li>Color-corrected group and action shots.</li>
              <li>Professional equipment and background.</li>
              <li>Final images delivered digitally in less than a week.</li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
        <div id='package3'>
          <div className='innerbox_package'>
            <img
              alt=''
              style={{ height: "450px", width: "300px" }}
              src={`https://ieqxnbaivrturiczktvu.supabase.co/storage/v1/object/public/corporatephotos/${images[0]?.name}`}
            ></img>
            <p>Company Package 3</p>
            <p>$3,800</p>
            <ul>
              <li>UP TO 100 people team or conference.</li>
              <li>On location photo session.</li>
              <li>Up to 4 hours.</li>
              <li>1 professionally retouched image per person.</li>
              <li>Group, team and action shots.</li>
              <li>Professional equipment and background.</li>
              <li>Final images delivered digitally in less than a week.</li>
            </ul>
            <button>Purchase</button>
          </div>
        </div>
      </div>
      <div>
        <p>
          We understand that every project is unique. Email us few words about
          your project and deadlines to get a quote based on your needs.
        </p>
        <p>Custom quote: info@creativecaptureph.com</p>
      </div>
    </div>
  );
};

export default Corporate;
