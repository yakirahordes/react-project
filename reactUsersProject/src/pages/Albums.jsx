import React, { useEffect, useState } from "react";
import { API_URL } from "../functions/API_URL";
import apiRequest from "../components/apiRequest";
import { handleDelete } from "../functions/delete";
import Album from "../components/Album";

export default function Albums() {
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchAlbumsData = async () => {
      try {
        const response = await fetch(`${API_URL}/albums?userId=${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        if (data.length === 0) setError("You have no posts");
        else {
          setAlbums(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchAlbumsData())();
  }, []);

  function handleDeleteAlbum(albumItem) {
    handleDelete(albums, albumItem, setAlbums, "albums", setError);
  }
  async function addAlbum(e) {
    e.preventDefault();
    const newAlbum = {
      userId: parseInt(userId),
      id: randomNum.toString(),
      title: newTitle,
    };

    const albumOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlbum),
    };
    const result = await apiRequest(`${API_URL}/albums`, albumOption);
    setError(result.errMsg);
    setAlbums((prev) => [...prev, result.data]);
    setAdd(false);
  }

  const randomNum = (Math.random(1000000 - 100 + 1) + 100);


  return (
    <>
      <h1>Albums</h1>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd(prev => !prev)}>add</button>
      {add && (
        <form>
          <label>Title:</label>
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <button onClick={addAlbum}>save</button>
        </form>
      )}
      <main className="albums-container">
        {albums.map((album) => {

          return (
            <Album
              key={album.id + "num"}
              album={album}
              handleDeleteAlbum={handleDeleteAlbum}
              setError={setError}
            />
          );
        })}
      </main>
    </>
  );
}
