import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_DATABASE_URL;
const supabaseKey = process.env.REACT_APP_DATABASE_ANOK;

const supabase = createClient(supabaseUrl, supabaseKey);

//get corporate images
export const getImages = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("corporatephotos")
      .list();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching images from database:", error.message);
  }
};

export const getBackgroundImages = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("homepagebackground")
      .list();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching images from database:", error.message);
  }
};

export const getReviews = async () => {
  try {
    const { data, error } = await supabase.from("reviews").select("*");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// get products for corporate
export const fetchData = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
//get cart items
export const fetchCartItems = async () => {
  try {
    const { data: cartItems, error } = await supabase.from("cart").select("*");
    if (error) {
      throw error;
    }
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
  }
};

//add individual products to cart
export async function addToCart(product, cartItems, setCartItems, uniqueId) {
  console.log("CARTIIIIII", cartItems);
  console.log("product from add", product);
  console.log("uniqueid from add", uniqueId);
  try {
    const existingCartItem = cartItems.find(
      (item) =>
        item.productId === product.id && item.userId === uniqueId.uniqueId
    );
    console.log("existing item from sup addto cart", existingCartItem);
    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + 1;
      const { error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id", existingCartItem.id);

      if (error) {
        throw error;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.id === existingCartItem.id
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      const { data, error } = await supabase.from("cart").insert([
        {
          productId: product.id,
          name: product.productName,
          price: product.price,
          quantity: 1,
          userId: uniqueId.uniqueId,
        },
      ]);

      if (error) {
        throw error;
      }

      setCartItems([...cartItems, data[0]]);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
  }
}

export async function addQuantity(product, cartItems, setCartItems, uniqueId) {
  try {
    const existingCartItem = cartItems?.find(
      (item) => item.productId === product.productId && item.userId === uniqueId
    );
    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + 1;
      const { error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id", existingCartItem.id);

      if (error) {
        throw error;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.id === existingCartItem.id
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      setCartItems(updatedCartItems);
    }
  } catch (error) {
    console.log("error:", error);
  }
}

export async function removeFromCart(
  product,
  cartItems,
  setCartItems,
  uniqueId
) {
  try {
    const existingCartItem = cartItems?.find(
      (item) => item.productId === product.productId && item.userId === uniqueId
    );
    if (existingCartItem) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("id", existingCartItem.id);

      if (error) {
        throw error;
      }

      const updatedCartItems = cartItems.filter(
        (item) => item.id !== existingCartItem.id
      );
      setCartItems(updatedCartItems);
    }
  } catch (error) {
    console.log("error:", error);
  }
}
export async function subQuantity(product, cartItems, setCartItems, uniqueId) {
  try {
    const existingCartItem = cartItems?.find(
      (item) => item.productId === product.productId && item.userId === uniqueId
    );
    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity - 1;
      if (updatedQuantity < 1) {
        // If updated quantity is less than 1, remove the item from the cart
        await removeFromCart(
          existingCartItem,
          cartItems,
          setCartItems,
          uniqueId
        );
        return; // Exit the function early
      }
      const { error } = await supabase
        .from("cart")
        .update({ quantity: updatedQuantity })
        .eq("id", existingCartItem.id);

      if (error) {
        throw error;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.id === existingCartItem.id
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      setCartItems(updatedCartItems);
    }
  } catch (error) {
    console.log("error:", error);
  }
}

//fetch cart items for specific user
export async function fetchCartItemsForUser(uniqueId, setCartItemsUser) {
  try {
    // Fetch the current cart items from Supabase for the specified user ID
    const { data: cartItems, error } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", uniqueId)
      .order("created_at");
    if (error) {
      throw error;
    }

    setCartItemsUser(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
  }
}

export default supabase;
