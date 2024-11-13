import React, { useEffect, useState } from "react";
import { API_URL } from "../functions/API_URL";
import apiRequest from "../components/apiRequest";
import Post from "../components/Post";
import { handleDelete } from "../functions/delete";
import { fetchData } from "../functions/fetchdata";

export default function Posts() {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState({
    isSearched: false,
    searchedPosts: [],
  });
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    (async () =>
      await fetchData(`posts?userId=${userId}`, "posts", setPosts, setError))();
  }, []);

  function handledeleteItem(item) {
    handleDelete(posts, item, setPosts, "posts", setError);
  }

  async function addPost(e) {
    const randomNum = Math.floor(Math.random() * (1000000 - 110 + 1) + 110);
    e.preventDefault();
    const newPost = {
      userId: parseInt(userId),
      id: randomNum.toString(),
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

  function handleSearch(e) {
    setSearch(posts);
    e.preventDefault();
    if (searchInput !== "") {
      let searched = posts.filter((post) =>
        post.title
          .trim()
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase())
      );
      if (searched.length === 0) {
        searched = posts.filter((post) => post.title === searchInput);
      }
      setSearch({ isSearched: true, searchedPosts: searched });
    }
  }

  return (
    <>
      <h1>Posts</h1>
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
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
      <main className="posts-container">
        {!search.isSearched
          ? posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                handledeleteItem={handledeleteItem}
                setError={setError}
              />
            );
          })
          : search.searchedPosts.map((post) => {
            return (
              <Post
                key={post.id + "b"}
                post={post}
                handledeleteItem={handledeleteItem}
                setError={setError}
              />
            );
          })}
      </main>
    </>
  );
}
