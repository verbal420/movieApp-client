const express = require('express');
const {
  getMovies,          // Get all movies
  getMovieById,       // Get a single movie by its ID
  createMovie,        // Create a new movie
  updateMovie,        // Update a movie by ID
  deleteMovie,        // Delete a movie by ID
  addComment,         // Add a comment to a movie
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');  // Middleware for authentication & authorization

const router = express.Router();

// Route to get all movies or create a new movie
router.route('/')
  .get(getMovies)  // Get all movies
  .post(protect, admin, createMovie);  // Create a new movie, only accessible by admin

// Route for handling movie-specific actions (get, update, delete)
router.route('/:id')
  .get(getMovieById)  // Get a movie by its ID
  .put(protect, admin, updateMovie)  // Update a movie, only accessible by admin
  .delete(protect, admin, deleteMovie);  // Delete a movie, only accessible by admin

// Route for adding a comment to a movie by movie ID
router.route('/:id/comments')
  .post(protect, addComment);  // Add comment, requires authentication

module.exports = router;
