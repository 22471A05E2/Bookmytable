import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Logout.css';
import Navbar from './Navbar';

const LogoutBox = () => {
  const [showLogoutBox, setShowLogoutBox] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Logged out successfully.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out. Please try again later.");
      });
  };

  const handleCancel = () => {
    setShowLogoutBox(false);
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      {showLogoutBox && (
        <div className="logout-box-container">
          <div className="logout-box-wrapper">
            <h1>Are you sure you want to log out?</h1>
            <div className="logout-box-buttons">
              <button
                className="confirm-button"
                onClick={handleLogout}
              >
                OK
              </button>
              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBox;