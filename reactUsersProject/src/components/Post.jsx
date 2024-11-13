import React, { useState, useContext } from "react";
import { UrlContext } from "../context/API_URL";
import apiRequest from "./apiRequest";

export default function Post({ post, handleDeletePost, setError }) {
  const API_URL = useContext(UrlContext);
  return (
    <div className="post-div" key={post.id}>
      <span>{post.id}</span>
      <br />
      <span>{post.title}</span>
      <br />
      <div>
        <button onClick={() => handleDeletePost(post)}>delete</button>
      </div>
      <span>{error}</span>
    </div>
  );
}
