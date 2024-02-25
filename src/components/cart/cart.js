import React, { useState, useEffect } from "react";
import supabase from "../Supabase";

const Cart = (uniqueId) => {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch the current cart items from Supabase
        const { data: cartItems, error } = await supabase
          .from("cart")
          .select("*")
          .eq("userId", uniqueId.uniqueId);

        if (error) {
          throw error;
        }

        setCartItems(cartItems || []);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  return (
    <div>
      {cartItems?.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - quantity {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
