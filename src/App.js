import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import About from './About';
import Contact from './Contact';
import Menu from './Menu';
import Booknow from './Booknow';
import Bookdetails from './Bookdetails';
import Logout from './Logout';

function App() {
  return (
    <Router basename="/Bookmytable">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Booknow" element={<Booknow />} />
        <Route path="/Bookdetails" element={<Bookdetails />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
