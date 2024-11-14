import React, { useEffect, useState } from "react";
import Album from "../components/Album";
import { fetchData } from "../functions/fetchdata";
import { handleDelete } from "../functions/delete";
import { addItem } from "../functions/add";

export default function Albums() {
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    (async () =>
      await fetchData(
        `albums?userId=${userId}`,
        "albums",
        setAlbums,
        setError
      ))();
  }, []);

  function handleDeleteAlbum(albumItem) {
    handleDelete(albums, albumItem, setAlbums, "albums", setError);
  }
  function addAlbum(e) {
    const newAlbum = {
      userId: parseInt(userId),
      title: newTitle,
    };
    addItem(e, newAlbum, "albums", setError, setAlbums, setAdd);
  }

  return (
    <>
      <h1>Albums</h1>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>Title:</label>
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <button onClick={addAlbum}>save</button>
        </form>
      )}
      <main className="albums-container">
        {albums.map((item) => {
          return (
            <Album
              key={item.id}
              item={item}
              handleDeleteAlbum={handleDeleteAlbum}
              setError={setError}
            />
          );
        })}
      </main>
    </>
  );
}
