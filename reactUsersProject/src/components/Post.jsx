import React, { useState, useContext } from "react";
import { API_URL } from "../functions/API_URL";
import apiRequest from "./apiRequest";
import Comments from "./Comments";

export default function Post({ post, handledeleteItem, setError }) {
  const [title, setTitle] = useState(post.title);
  const [isEdited, setIsEdited] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showComments, setShowComments] = useState(false);

  async function handleSaveChanges() {
    const url = `${API_URL}/posts/${post.id}`;
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    };
    const result = await apiRequest(url, updateOption);
    setError(result.errMsg);
    setIsEdited(false);
  }

  return (
    <div className="post-div" key={post.id}>
      <span>{post.id}</span>
      <br />
      {isEdited ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <label>{title}</label>
      )}
      <br />
      <span>{showBody ? post.body : null}</span>

      {showComments ? (
        <div className="post-comments">
          <Comments postId={post.id} />
        </div>
      ) : null}

      <div className="post-buttons">
        {!isEdited ? (
          <button onClick={() => setIsEdited(true)}>edit</button>
        ) : (
          <button onClick={handleSaveChanges}>save</button>
        )}
        <button onClick={() => setShowComments((prev) => !prev)}>
          Comments
        </button>
        <button onClick={() => setShowBody((prev) => !prev)}>Body</button>
        <button onClick={() => handledeleteItem(post)}>delete</button>
      </div>
    </div>
  );
}
