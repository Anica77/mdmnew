import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import { Link } from "react-router-dom";
import "./Corporate.css";
import Package from "../package/package";

const Corporate = (uniqueId) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");

        if (error) {
          throw error;
        }

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const firstRow = data.slice(0, 3);
  const secondRow = data.slice(3, 6);

  return (
    <div>
      <div className='corporate_container'>
        <h2>Business</h2>
        <div className='corporate_packages'>
          <div id='package1'>
            {firstRow.map((product) => (
              <Package key={product.id} uniqueId={uniqueId} product={product} />
            ))}
          </div>
        </div>
        <div>
          <p>
            Choose you own images in the studio or delegate this task to our
            photographer with years of experience taking professional headshots
            in New York Metropolitan Area.
          </p>
          <p>
            Request customed quote{" "}
            <Link
              onClick={() =>
                (window.location = "mailto:email@creativecaptureph.com")
              }
            >
              email@creativecaptureph.com
            </Link>
            . Email us few words about your project and deadlines.
          </p>
        </div>
      </div>
      <h2>Company Packages</h2>
      <div className='corporate_packages'>
        <div id='package1'>
          {secondRow.map((product) => (
            <Package key={product.id} uniqueId={uniqueId} product={product} />
          ))}
        </div>
      </div>
      <div>
        <p>
          We understand that every project is unique. Email us few words about
          your project and deadlines to get a quote based on your needs.
        </p>
        <p>
          Custom quote:{" "}
          <Link
            onClick={() =>
              (window.location = "mailto:email@info@creativecaptureph.com")
            }
          >
            info@creativecaptureph.com
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Corporate;
