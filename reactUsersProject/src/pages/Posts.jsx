import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlContext } from "../context/API_URL";
import apiRequest from "../components/apiRequest";
import Post from "../components/Post";

export default function Posts() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const API_URL = useContext(UrlContext);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/posts?userId=${userId}`);
        console.log("response: ", response);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        console.log("data: ", data);
        if (data.length === 0) setError("You have no posts");
        else {
          setPosts(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchUsersData())();
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

  return (
    <>
      {error !== null && <p>{error}</p>}
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
