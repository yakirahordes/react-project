import React, { useState } from "react";
import Photos from "./Photos";
import { API_URL } from "../functions/API_URL";
import apiRequest from "./apiRequest";
export default function Album({ album, handleDeleteAlbum, setError }) {
    const [showPhotos, setShowPhotos] = useState(false);
    const [title, setTitle] = useState(album.title);
    const [isEdited, setIsEdited] = useState(false);

    async function handleSaveChanges() {
        const url = `${API_URL}/albums/${album.id}`;
        const updateOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
            }),
        };
        const result = await apiRequest(url, updateOption);
        setError(result.errMsg);
        setIsEdited(false);
    }
    return (
        <div className="album-data">
            <span>{album.id}</span>
            <br />
            {isEdited ? (
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            ) : (
                <label>{title}</label>
            )}
            <br />
            {showPhotos && (
                <div className="album-photos">
                    <Photos albumId={album.id} />
                </div>
            )}

            <div className="post-buttons">
                {!isEdited ? (
                    <button onClick={() => setIsEdited(true)}>edit</button>
                ) : (
                    <button onClick={handleSaveChanges}>save</button>
                )}
                <button onClick={() => setShowPhotos((prev) => !prev)}>Photos</button>
                <button onClick={() => handleDeleteAlbum(album)}>delete</button>
            </div>
        </div>
    );
}
