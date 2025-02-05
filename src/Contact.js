import React, { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth"; 
import database from './firebase'; 
import './Contact.css';
import Navbar from './Navbar';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userMessage: '',
  });

  const [formErrors, setFormErrors] = useState({
    userName: '',
    userEmail: '',
    userMessage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = { userName: '', userEmail: '', userMessage: '' };
    let isValid = true;

    if (!formData.userName) {
      newErrors.userName = 'Name is required.';
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.userEmail || !emailPattern.test(formData.userEmail)) {
      newErrors.userEmail = 'Please enter a valid email.';
      isValid = false;
    }

    if (!formData.userMessage) {
      newErrors.userMessage = 'Message is required.';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const auth = getAuth();
        const user = auth.currentUser; 
        if (!user) {
          alert("Please log in to submit the form.");
          return;
        }

        const uid = user.uid; 
        const db = getDatabase();
        const contactRef = ref(db, `users/${uid}/contact`);
        await push(contactRef, formData);

        alert(`Thank you for contacting us, ${formData.userName}!`);
        setFormData({
          userName: '',
          userEmail: '',
          userMessage: '',
        });
      } catch (error) {
        console.error('Error storing data in Firebase:', error);
        alert('An error occurred while sending your message. Please try again later.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-form-container">
        <div className="contact-form-wrapper">
          <h1>Contact Us</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="contact-form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
              {formErrors.userName && <span className="form-error-message">{formErrors.userName}</span>}
            </div>

            <div className="contact-form-group">
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
              {formErrors.userEmail && <span className="form-error-message">{formErrors.userEmail}</span>}
            </div>

            <div className="contact-form-group">
              <label htmlFor="userMessage">Message</label>
              <textarea
                id="userMessage"
                name="userMessage"
                value={formData.userMessage}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              ></textarea>
              {formErrors.userMessage && <span className="form-error-message">{formErrors.userMessage}</span>}
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
