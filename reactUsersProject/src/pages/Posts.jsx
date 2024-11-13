import React, { useEffect, useContext, useState } from "react";
import { UrlContext } from "../context/API_URL";
import apiRequest from "../components/apiRequest";
import Post from "../components/Post";

export default function Posts() {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const API_URL = useContext(UrlContext);
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await fetch(`${API_URL}/posts?userId=${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        if (data.length === 0) setError("You have no posts");
        else {
          setPosts(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchPostsData())();
  }, []);

  async function handleDeletePost(postItem) {
    const newPostList = posts.filter((post) => post.id !== postItem.id);
    setPosts(newPostList);
    const deleteOption = {
      method: "DELETE",
    };
    const url = `${API_URL}/posts/${postItem.id}`;
    const result = await apiRequest(url, deleteOption);
    setError(result.errMsg);
  }

  async function addPost(e) {
    e.preventDefault();
    const newPost = {
      userId: userId,
      id: randomNum,
      title: newTitle,
      body: newBody,
    };

    const postOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    };
    const result = await apiRequest(`${API_URL}/posts`, postOption);
    setError(result.errMsg);
    setPosts((prev) => [...prev, result.data]);
    setAdd(false);
  }

  const randomNum = Math.floor(Math.random(1000000 - 100 + 1) + 100);

  return (
    <>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd(true)}>add</button>
      {add && (
        <form>
          <label>Title:</label>
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <label>Body:</label>
          <input onChange={(e) => setNewBody(e.target.value)}></input>
          <button onClick={addPost}>save</button>
        </form>
      )}
      <main className="posts-container">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
              setError={setError}
            />
          );
        })}
      </main>
    </>
  );
}
