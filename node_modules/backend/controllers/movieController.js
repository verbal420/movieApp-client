const Movie = require('../models/Movie');

// Fetch all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

// Fetch a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie' });
  }
};

// Create a new movie (Admin only)
const createMovie = async (req, res) => {
  const { title, director, year, description, genre } = req.body;
  try {
    const movie = await Movie.create({ title, director, year, description, genre });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create movie' });
  }
};

// Update a movie (Admin only)
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.archived = !movie.archived;
      const updatedMovie = await movie.save();
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie' });
  }
};

// Delete a movie (Admin only)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.remove();
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie' });
  }
};

// Add a comment to a movie
const addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.comments.push({ user: req.user._id, text });
      const updatedMovie = await movie.save();
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  addComment,
};
