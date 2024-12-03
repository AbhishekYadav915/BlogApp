import React from "react";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/components/Home.jsx";
import Footer from "../src/components/Footer.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "../src/pages/About.jsx";
import Contact from "../src/pages/Contact.jsx";
import Blogs from "../src/pages/Blogs.jsx";
import Login from "../src/pages/Login.jsx";
import Dashboard from "../src/pages/Dashboard.jsx";
import Register from "../src/pages/Register.jsx";
import Creators from "../src/pages/Creators.jsx";

import { useAuth } from "../src/context/AuthProvider.jsx";
// import {Toaster} from 'react-hot-toast'
import  { Toaster } from 'react-hot-toast';
const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      {/* Defining routes */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      <Toaster/>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
