import React, { useState } from 'react';
import { addComment } from '../api';

const AddComment = ({ movieId, token, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      const { data } = await addComment(movieId, { text: commentText }, token);
      onCommentAdded(data); // Update parent component
      setCommentText('');
    } catch (error) {
      console.error(error);
      alert('Error adding comment.');
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" id="addComment">Add Comment</button>
    </form>
  );
};

export default AddComment;
