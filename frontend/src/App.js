import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MoviesList from './pages/MoviesList';
import AdminDashboard from './components/AdminDashboard';
import SingleMovie from './components/SingleMovie';
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Ensure token state is updated from localStorage on page load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} /> {/* Render Navbar */}
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {token && (
          <>
            <Route path="/admin" element={<AdminDashboard token={token} />} />
            <Route path="/movies/:id" element={<SingleMovie token={token} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
