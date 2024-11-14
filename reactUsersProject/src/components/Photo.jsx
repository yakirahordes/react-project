import React from "react";

export default function Photo({ photo, handleDeletePhoto }) {
  return (
    <div className="photo-div">
      <img src={photo.thumbnailUrl} />
      <button
        className="delete-photo-button"
        onClick={() => handleDeletePhoto(photo)}
      >
        delete Photo
      </button>
    </div>
  );
}
