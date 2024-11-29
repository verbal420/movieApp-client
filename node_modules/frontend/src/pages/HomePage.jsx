import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to MovieApp</h1>
      <p>Your favorite movie streaming app</p>
      <div className="home-buttons">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/movies">
          <button className="home-button">View Movies</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
