import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const Comment = ({ comment }) => {
  const [commenting, setCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentClick = () => {
    setCommenting(true);
  };

  const handleCommentSubmit = async () => {
    // Assuming you have an API route to post comments on the note
    try {
      await axios.post('http://localhost:5000/notes/comment', {
        note_id: comment.note_id, // ID of the note associated with the comment
        username: comment.mentionedUser,
        comment: newComment,
      });
      // Clear input and close comment form
      setNewComment('');
      setCommenting(false);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <span>
        <strong>{comment.username}:</strong> {comment.content}
      </span>
      <Button onClick={handleCommentClick}>Reply</Button>
      {commenting && (
        <div>
          <input
            type="text"
            placeholder={`Reply to ${comment.username}`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleCommentSubmit}>Post Comment</Button>
        </div>
      )}
    </div>
  );
};

export default Comment;
