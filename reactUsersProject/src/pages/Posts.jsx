import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { handleDelete } from "../functions/delete";
import { fetchData } from "../functions/fetchdata";
import { addItem } from "../functions/add";
import { searchItem } from "../functions/search";

export default function Posts() {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState({
    isSearched: false,
    searchedItems: [],
  });
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    (async () =>
      await fetchData(`posts?userId=${userId}`, "posts", setPosts, setError))();
  }, []);

  function handledeleteItem(item) {
    handleDelete(posts, item, setPosts, "posts", setError);
  }

  function addPost(e) {
    const newPost = {
      userId: parseInt(userId),
      title: newTitle,
      body: newBody,
    };
    addItem(e, newPost, "posts", setError, setPosts, setAdd);
  }

  function handleSearch(e) {
    searchItem(e, searchInput, posts, setSearch);
  }

  return (
    <>
      <h1>Posts</h1>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>Title:</label><br/>
          <input onChange={(e) => setNewTitle(e.target.value)}></input><br/>
          <label>Body:</label><br/>
          <input onChange={(e) => setNewBody(e.target.value)}></input><br/>
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
          ? posts.map((item) => {
              return (
                <Post
                  key={item.id}
                  item={item}
                  handledeleteItem={handledeleteItem}
                  setError={setError}
                />
              );
            })
          : search.searchedItems.map((item) => {
              return (
                <Post
                  key={item.id + "b"}
                  item={item}
                  handledeleteItem={handledeleteItem}
                  setError={setError}
                />
              );
            })}
      </main>
    </>
  );
}
