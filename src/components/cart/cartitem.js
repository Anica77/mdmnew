import React, { useState, useEffect } from "react";
import {
  addQuantity,
  subQuantity,
  removeFromCart,
  fetchCartItems,
} from "../Supabase";
import { Trash } from "phosphor-react";

export const CartItem = ({ uniqueId, data }) => {
  const { name, price, quantity } = data;

  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    async function getCartItems() {
      const cartItems = await fetchCartItems();
      if (cartItems) {
        setCartItems(cartItems);
      }
    }
    getCartItems();
  }, [cartItems]);

  return (
    <div className='cartItem'>
      <div className='description'>
        <p className='nameTrash'>
          <b>{name}</b>
          <button
            onClick={() => {
              removeFromCart(data, cartItems, setCartItems, uniqueId);
            }}
          >
            <Trash size={20} />
          </button>
        </p>
        <p> Price: ${price}</p>
        <div className='minusplus'>
          <button
            onClick={() => {
              subQuantity(data, cartItems, setCartItems, uniqueId);
            }}
          >
            -
          </button>
          <p>Quantity: {quantity}</p>
          <button
            onClick={() => {
              addQuantity(data, cartItems, setCartItems, uniqueId);
            }}
          >
            +
          </button>
        </div>
        {/* <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div> */}
      </div>
    </div>
  );
};
