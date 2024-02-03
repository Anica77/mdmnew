import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Corporate from "./components/Corporate/Corporate";
import Fashion from "./components/fashion/fashion";
import Portrait from "./components/portrait/portrait";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/about/about";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/corporate' element={<Corporate />} />
          <Route exact path='/portraits' element={<Portrait />} />
          <Route path='/fashion' element={<Fashion />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
