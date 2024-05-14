import React from "react";
// import {
//   setUniqueSessionStorageItem,
//   getSessionStorageItem,
// } from "./sessionStorageUtils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Corporate from "./components/Corporate/Corporate";
import Fashion from "./components/fashion/fashion";
import Portrait from "./components/portrait/portrait";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/about/about";
import "./App.css";

function App() {
  // const [uniqueId, setUniqueId] = useState("");
  // const [cartItems, setCartItems] = useState(0);
  // const [totalQuantity, setTotalQuantity] = useState(0);

  // useEffect(() => {
  //   setUniqueSessionStorageItem("unique_id");
  //   const idFromSessionStorage = getSessionStorageItem("unique_id");
  //   if (idFromSessionStorage) {
  //     setUniqueId(idFromSessionStorage);
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchCartItemsAndUpdateTotalQuantity = async () => {
  //     try {
  //       // Fetch the cart items
  //       const fetchedCartItems = await fetchCartItemsForUser();
  //       setCartItems(fetchedCartItems); // Update the cartItems state

  //       // Calculate total quantity from fetched cart items
  //       const newTotalQuantity = fetchedCartItems.reduce(
  //         (total, item) => total + item.quantity,
  //         0
  //       );
  //       setTotalQuantity(newTotalQuantity); // Update the totalQuantity state
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error.message);
  //     }
  //   };

  //   // Call the function to fetch cart items and update totalQuantity
  //   fetchCartItemsAndUpdateTotalQuantity();
  // }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/corporate' element={<Corporate />} />
          <Route exact path='/portraits' element={<Portrait />} />
          <Route path='/fashion' element={<Fashion />} />
          <Route path='/events' />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
