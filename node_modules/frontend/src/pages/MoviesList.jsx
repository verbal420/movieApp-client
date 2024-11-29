import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const { data } = await fetchMovies();
      setMovies(data);
    };
    fetchAllMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
