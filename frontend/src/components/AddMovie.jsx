import React, { useState } from 'react';
import { addMovie } from '../api';

const AddMovie = ({ token }) => {
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    year: '',
    description: '',
    genre: '',
  });

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie(movieData, token);
      alert('Movie added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding movie');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="director" placeholder="Director" onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="genre" placeholder="Genre" onChange={handleChange} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
