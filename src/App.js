import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Corporate from "./components/Corporate/Corporate";
import Fashion from "./components/fashion/fashion";
import Portrait from "./components/portrait/portrait";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/about/about";
import AdminLogin from "./components/adminLogin/AdminLogin";
import supabase from "./components/Supabase";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);

  const handleSessionChange = (newSession) => {
    setSession(newSession);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      setSession(null);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        handleSessionChange(session);
        setupAutoRefresh(session);
      }
    };

    const setupAutoRefresh = (session) => {
      const expiresIn = session.expires_in * 1000; // Convert to milliseconds
      setTimeout(refreshToken, expiresIn - 60000); // Set a timer to refresh the token 1 minute before it expires
    };

    const refreshToken = async () => {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Error refreshing token:", error);
      } else {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        handleSessionChange(session);
        setupAutoRefresh(session); // Reset the timer
      }
    };

    checkSession();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar session={session} onLogout={handleLogout} />
        <Routes>
          <Route exact path='/' element={<Home session={session} />} />
          <Route
            exact
            path='/admin'
            element={<AdminLogin handleSessionChange={handleSessionChange} />}
          />
          <Route path='/corporate' element={<Corporate session={session} />} />
          <Route
            exact
            path='/portraits'
            element={<Portrait session={session} />}
          />
          <Route path='/fashion' element={<Fashion session={session} />} />
          <Route path='/about' element={<About session={session} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
