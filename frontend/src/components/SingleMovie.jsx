import React, { useEffect, useState } from 'react';
import { fetchMovieById, addComment } from '../api';

const SingleMovie = ({ id, token }) => {
  const [movie, setMovie] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await fetchMovieById(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment(id, { text: comment }, token);
      setMovie(data);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p>{movie.description}</p>
      <h3>Comments</h3>
      <ul>
        {movie.comments &&
          movie.comments.map((c) => (
            <li key={c._id}>{c.text}</li>
          ))}
      </ul>
      <form onSubmit={handleComment}>
        <input
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" id="addComment">Add Comment</button>
      </form>
    </div>
  );
};

export default SingleMovie;
