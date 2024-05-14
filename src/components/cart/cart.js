import React, { useState, useEffect } from "react";
import { fetchCartItemsForUser } from "../Supabase";
import { CartItem } from "./cartitem";
import "./cart.css";

const Cart = ({ uniqueId }) => {
  const [cartItemsUser, setCartItemsUser] = useState([]);

  useEffect(() => {
    fetchCartItemsForUser(uniqueId, setCartItemsUser);
  }, [uniqueId, cartItemsUser]);

  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cart'>
        {cartItemsUser?.map((item) => (
          <CartItem key={item.id} data={item} uniqueId={uniqueId} />
        ))}
      </div>

      {/* {totalAmount > 0 ? (
      <div className="checkout">
        <p> Subtotal: ${totalAmount} </p>
        <button onClick={() => navigate("/")}> Continue Shopping </button>
        <button
          onClick={() => {
            checkout();
            navigate("/checkout");
          }}
        >
          {" "}
          Checkout{" "}
        </button>
      </div>
    ) : (
      <h1> Your Shopping Cart is Empty</h1>
    )} */}
    </div>
  );
};

export default Cart;
