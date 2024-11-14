import React, { useState, useEffect } from "react";
import { API_URL } from "../functions/API_URL";
import { handleDelete } from "../functions/delete";
import Photo from "./Photo";
import { addItem } from "../functions/add";

export default function Photos({ albumId }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [photoAddress, setPhotoAddress] = useState("");
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    (async () => await fetchPhotosData())();
  }, []);
  const fetchPhotosData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/photos?_start=${startIndex}&_limit=5&albumId=${albumId}`
      );
      if (!response.ok) throw Error("Did not receive expected data");
      const data = await response.json();
      if (data.length === 0 && photos.length !== 0) {
        setShowMore(false);
        setError("There is no more photos");
      } else {
        if (data.length === 0 && photos.length === 0){
          setShowMore(false);
          setError("You have no photos");}
        else {
          if (photos.length === 0) {
            setPhotos(data);
          } else {
            setPhotos((prev) => [...prev, ...data]);
          }
          setError(null);
          setStartIndex((prev) => prev + 5);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  async function handleDeletePhoto(photoItem) {
    handleDelete(photos, photoItem, setPhotos, "photos", setError);
  }

  function addPhoto(e) {
    const newPhoto = {
      albumId: parseInt(albumId),
      title: newTitle,
      url: photoAddress,
      thumbnailUrl: photoAddress,
    };
    addItem(e, newPhoto, "photos", setError, setPhotos, setAdd);
  }

  return (
    <>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>photo title:</label><br/>
          <input onChange={(e) => setNewTitle(e.target.value)}></input><br/>
          <label>photo adress:</label><br/>
          <input onChange={(e) => setPhotoAddress(e.target.value)}></input><br/>
          <button onClick={addPhoto}>save</button>
        </form>
      )}
      <main className="photos-container">
        {photos.map((photo) => {
          return (
            <Photo
              key={photo.id}
              photo={photo}
              handleDeletePhoto={handleDeletePhoto}
              setError={setError}
            />
          );
        })}
      </main>
      {showMore && <button onClick={fetchPhotosData}>show more</button>}
    </>
  );
}
