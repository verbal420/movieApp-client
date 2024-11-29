import React, { useState, useEffect } from 'react';
import { fetchMovies, deleteMovie, updateMovie } from '../api';
import AddMovie from './AddMovie';

const AdminDashboard = ({ token }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const { data } = await fetchMovies();
      setMovies(data);
    };
    fetchAllMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id, token);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedMovie = await updateMovie(id, token);
      setMovies(
        movies.map((movie) => (movie._id === id ? updatedMovie.data : movie))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AddMovie token={token} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                <button onClick={() => handleUpdate(movie._id)}>Update</button>
                <button onClick={() => handleDelete(movie._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
