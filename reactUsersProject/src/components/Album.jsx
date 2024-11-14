import React, { useState } from "react";
import Photos from "./Photos";
import { edit } from "../functions/edit";

export default function Album({ item, handleDeleteAlbum, setError }) {
  const [showPhotos, setShowPhotos] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [isEdited, setIsEdited] = useState(false);

  function handleSaveChanges() {
    edit("albums", item, title, setError, setIsEdited);
  }

  return (
    <div className="album-data">
      <span>{item.id}</span>
      <br />
      {isEdited ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <label>{title}</label>
      )}
      <br />
      {showPhotos && (
        <div className="album-photos">
          <Photos albumId={item.id} />
        </div>
      )}

      <div className="post-buttons">
        {!isEdited ? (
          <button onClick={() => setIsEdited(true)}>edit</button>
        ) : (
          <button onClick={handleSaveChanges}>save</button>
        )}
        <button onClick={() => setShowPhotos((prev) => !prev)}>Photos</button>
        <button onClick={() => handleDeleteAlbum(item)}>delete</button>
      </div>
    </div>
  );
}
