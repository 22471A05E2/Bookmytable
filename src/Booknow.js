import React, { useState, useEffect } from "react";
import { ref, push } from "firebase/database"; 
import { database } from "./firebase"; 
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import "./Booknow.css";
import Navbar from './Navbar';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    timing: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState(""); 
  const [currentTime, setCurrentTime] = useState("");
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);

    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);

    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); 
      } else {
        setUserId(null); 
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (formData.name.length > 25) {
      newErrors.name = "Name should not exceed 25 characters";
      formIsValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      formIsValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      formIsValid = false;
    }

    if (formData.persons <= 0) {
      newErrors.persons = "Total persons must be at least 1";
      formIsValid = false;
    }

    if (!formData.date || formData.date < currentDate) {
      newErrors.date = "Please select a date from today onwards";
      formIsValid = false;
    }

    if (formData.date === currentDate && formData.timing < currentTime) {
      newErrors.timing = "Please select a time from now onwards for today's date";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!userId) {
        alert("You need to log in to make a booking.");
        return;
      }

      try {
        
        const bookingsRef = ref(database, `users/${userId}/bookings`);
        await push(bookingsRef, formData);
        alert("Booking confirmed!");

        
        setFormData({
          name: "",
          email: "",
          phone: "",
          persons: "",
          timing: "",
          date: "",
        });
      } catch (error) {
        console.error("Error saving booking: ", error);
        alert("Failed to submit booking. Please try again.");
      }
    }
  };

  return (
    <><Navbar />
      <div className="form-container compact">
        <div className="form-box">
          <h2>Book a Table</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
              type="number"
              name="persons"
              placeholder="No. of Persons"
              value={formData.persons}
              onChange={handleChange}
              required
            />
            {errors.persons && <p className="error">{errors.persons}</p>}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={currentDate} // Ensure date is today or in the future
              required
            />
            {errors.date && <p className="error">{errors.date}</p>}

            <input
              type="time"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              min={formData.date === currentDate ? currentTime : "00:00"} // Restrict time only for today
              required
            />
            {errors.timing && <p className="error">{errors.timing}</p>}

            <button type="submit">Submit Booking</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
