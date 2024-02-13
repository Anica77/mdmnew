import React, { useState, useEffect } from "react";
import supabase from "../Supabase";

const Cart = () => {
  const [cartItems, setCartItems] = useState();

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

    fetchCartItems();
  }, [cartItems]);
  return (
    <div>
      {cartItems?.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export default Cart;
