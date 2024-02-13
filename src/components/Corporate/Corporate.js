import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import { Link } from "react-router-dom";
import "./Corporate.css";

const Corporate = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState();

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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch the current cart items from Supabase
        const { data: cartItems, error } = await supabase
          .from("cart")
          .select("*");

        if (error) {
          throw error;
        }

        setCartItems(cartItems || []);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems(); // Fetch cart items when the component mounts

    // Clean-up function to unsubscribe when the component unmounts
    return () => {
      // Optionally clean up any subscriptions or resources here
    };
  }, [cartItems]);

  const addToCart = async (product) => {
    console.log("cartItems", cartItems);
    console.log("product", product);
    try {
      // Check if the product already exists in the cart
      const existingCartItem = cartItems.find(
        (item) => item.productId === product.id
      );
      console.log("existing cart item", existingCartItem);

      if (existingCartItem) {
        // If the product already exists, update its quantity
        const updatedQuantity = existingCartItem.quantity + 1;
        const { data, error } = await supabase
          .from("cart")
          .update({ quantity: updatedQuantity })
          .eq("id", existingCartItem.id); // Assuming you have an 'id' column in your cart table

        if (error) {
          throw error;
        }

        // Update the local state with the updated cart items
        const updatedCartItems = cartItems.map((item) =>
          item.id === existingCartItem.id
            ? { ...item, quantity: updatedQuantity }
            : item
        );
        setCartItems(updatedCartItems);
      } else {
        // If the product doesn't exist, insert a new record
        const { data, error } = await supabase.from("cart").insert([
          {
            productId: product.id,
            name: product.productName,
            price: product.price,
            quantity: +1,
          },
        ]);

        if (error) {
          throw error;
        }

        // Update the local state with the new cart items
        setCartItems([...cartItems, data[0]]);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  // const addToCart = async (product) => {
  //   try {
  //     // Add the product to the cart in Supabase
  //     const { data, error } = await supabase.from("cart").insert([
  //       {
  //         productId: product.id,
  //         name: product.productName,
  //         price: product.price,
  //         quantity: +1,
  //       },
  //     ]);

  //     if (error) {
  //       throw error;
  //     }

  //     // Update the local state with the new cart items
  //     setCartItems([...cartItems, data[0]]);
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error.message);
  //   }
  // };

  const firstRow = data.slice(0, 3);
  const secondRow = data.slice(3, 6);

  return (
    <div>
      <div className='corporate_container'>
        <h2>Business</h2>
        <div className='corporate_packages'>
          <div id='package1'>
            {firstRow.map((product) => (
              <div key={product.id}>
                <img
                  src={product.imageUrl}
                  alt=''
                  style={{ height: "450px", width: "300px" }}
                />
                <h6>{product.productName}</h6>
                <p>${product.price}</p>
                <ul>
                  {product.productDes.map((des) => (
                    <li key={des}>{des}</li>
                  ))}
                </ul>
                {product.price === "400" ? (
                  <div>
                    <button>ADD Hair and Make up Artist</button>
                    <p>
                      Available upon request at least 48 Hours prior to your
                      shoot.
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {/* Adding quantity button later */}
                <button>Add additional images</button>
                <p>$25 per image</p>
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Purchase
                </button>
              </div>
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
            <div key={product.id}>
              <img
                src={product.imageUrl}
                alt=''
                style={{ height: "450px", width: "300px" }}
              />
              <h6>{product.productName}</h6>
              <p>${product.price}</p>
              <ul>
                {product.productDes.map((des) => (
                  <li key={des}>{des}</li>
                ))}
              </ul>
              <button>Purchase</button>
            </div>
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
