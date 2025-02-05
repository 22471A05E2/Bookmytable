import React, { useState } from "react";
import "./Signup.css"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/Login"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
