import React from "react";
import "./Home.css";
import Navbar from "./Navbar";

export default function Home() {
  return (<>
  <Navbar/>
    <div className="home">
      <div className="home-content">
        <h1>Book My Table</h1>
        <h2>Reserve. Relax. Relish.</h2>
        <p>Experience the new ways of dining by booking your table!</p>
      </div>
    </div>
    </>
  );
}
