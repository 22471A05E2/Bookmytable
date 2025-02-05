import React from "react";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Menu from "./Menu";
import Booknow from "./Booknow";
import Bookdetails from "./Bookdetails";
import "./Navbar.css";

function Navbar() {
  return (
    
      <div className="navbar">
        <div className="logo">
          Book <span>My</span> Table
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/Home"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Booknow"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Book Now
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Bookdetails"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Logout"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      // <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/Home" element={<Home />} />
      //   <Route path="/About" element={<About />} />
      //   <Route path="/Contact" element={<Contact />} />
      //   <Route path="/Menu" element={<Menu />} />
      //   <Route path="/Booknow" element={<Booknow />} />
      //   <Route path="/Bookdetails" element={<Bookdetails />} />
      // </Routes>
    
  );
}

export default Navbar;
