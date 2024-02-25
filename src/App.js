import React, { useEffect, useState } from "react";
import {
  setUniqueSessionStorageItem,
  getSessionStorageItem,
} from "./sessionStorageUtils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Corporate from "./components/Corporate/Corporate";
import Fashion from "./components/fashion/fashion";
import Portrait from "./components/portrait/portrait";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/about/about";
import Cart from "./components/cart/cart";
import "./App.css";

function App() {
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    setUniqueSessionStorageItem("unique_id");
    const idFromSessionStorage = getSessionStorageItem("unique_id");
    if (idFromSessionStorage) {
      setUniqueId(idFromSessionStorage);
    }
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home uniqueId={uniqueId} />} />
          <Route
            path='/corporate'
            element={<Corporate uniqueId={uniqueId} />}
          />
          <Route
            exact
            path='/portraits'
            element={<Portrait uniqueId={uniqueId} />}
          />
          <Route path='/fashion' element={<Fashion uniqueId={uniqueId} />} />
          <Route path='/events' uniqueId={uniqueId} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart uniqueId={uniqueId} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
