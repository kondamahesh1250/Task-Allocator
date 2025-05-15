import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Task Allocator</h1>
      <p className="landing-description">
        A simple tool to upload, distribute, and manage tasks across your agents efficiently.
      </p>
      <div className="landing-buttons">
        <Link to="/login">
          <button className="btn primary-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
