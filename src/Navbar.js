import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        Book <span>My</span> Table
      </div>
      
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Vertical Navbar Menu for Mobile */}
      <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
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

      {/* Desktop Navbar */}
      <nav className="desktop-nav">
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
  );
}

export default Navbar;
