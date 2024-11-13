import React from "react";

export default function Comment({ comment, handleDeleteComment }) {
  return (
    <div className="comment-div" key={comment.id}>
      <div className="comment-data">
        <span>{comment.id}</span>
        <br />
        <span>
          <strong>commenter's name: </strong>
          {comment.name}
        </span>
        <br />
        <span>
          <strong>comment: </strong>
          {comment.body}
        </span>
      </div>

      <div className="comment-buttons">
        <button onClick={() => handleDeleteComment(comment)}>delete</button>
      </div>
    </div>
  );
}
