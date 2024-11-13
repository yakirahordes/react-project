import React, { useState, useContext } from "react";
import { UrlContext } from "../context/API_URL";
import apiRequest from "./apiRequest";
import Comments from "./Comments";

export default function Post({ post, handleDeletePost, setError }) {
  const [title, setTitle] = useState(post.title);
  const [isEdited, setIsEdited] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const API_URL = useContext(UrlContext);

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
      <div className="post-data">
        <span>{post.id}</span>
        <br />
        {isEdited ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <label>{title}</label>
        )}
        <br />
        <span>{showBody ? post.body : null}</span>
      </div>
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
        <button onClick={() => handleDeletePost(post)}>delete</button>
      </div>
    </div>
  );
}
