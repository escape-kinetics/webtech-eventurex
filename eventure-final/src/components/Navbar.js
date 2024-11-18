// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/EventureX__2.png';
import './Navbar.css'; // Add styles here

function Navbar() {
  return (
    <nav className="navbar">
      
      <Link to="/"><img src={logo} alt="EventureX Logo" height="75px" width="75px" /></Link>
      <ul className="navbar-links">
       <li><Link to="/">Home</Link></li>
        <li><Link to="/join">Join Event</Link></li>
        <li><Link to="/create">Create Event</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
