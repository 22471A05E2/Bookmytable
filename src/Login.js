import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; 

function Login() {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome back, ${userCredential.user.email}!`);
      navigate("/Home"); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/Signup"); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p className="navigate-text">
          Don't have an account? <a href="#" onClick={handleNavigateToRegister}>Sign Up</a>
        </p>
      </div>

      {/* Footer with tagline */}
      <footer>
        <marquee behavior="scroll" direction="left" scrollamount="10">
          Book your table with ease at BookMyTable – your go-to platform for seamless bookings!
        </marquee>
      </footer>
    </div>
  );
}

export default Login;
