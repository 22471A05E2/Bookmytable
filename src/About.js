import React from "react";
import "./About.css";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
    <Navbar/>
    
    <div className="about-us-page">
      <section className="section section-1">
        <div className="content-box">
          <h2>Welcome to BookMyTable</h2>
          <p>
            BookMyTable simplifies your dining experience by offering easy table
            reservations and meal pre-booking at your favorite restaurants.
          </p>
        </div>
      </section>
      <section className="section section-2">
        <div className="content-box">
          <h2>Our Mission</h2>
          <p>
            We aim to reduce waiting times and make dining seamless, providing
            convenience and comfort for all our users.
          </p>
        </div>
      </section>
      <section className="section section-3">
        <div className="content-box">
          <h2>Why Choose Us?</h2>
          <p>
            With a user-friendly platform, you can browse menus, reserve tables,
            and enjoy a hassle-free dining experience.
          </p>
        </div>
      </section>
      <section className="section section-4">
        <div className="content-box">
          <h2>Contact Us</h2>
          <p>
            Reach out to us for inquiries, feedback, or assistance. We're here
            to make your dining experience better.
          </p>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
