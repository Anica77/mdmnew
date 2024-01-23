import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main/Main";
import Corporate from "./components/Corporate/Corporate";
import Fashion from "./components/fashion/fashion";
import Portrait from "./components/portrait/portrait";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/corporate' element={<Corporate />} />
          <Route path='/portrait' element={<Portrait />} />
          <Route path='/fashion' element={<Fashion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
