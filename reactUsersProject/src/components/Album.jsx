import React, { useState } from 'react'
import Photos from './Photos';
export default function Album({ album, handleDeleteAlbum, setError }) {
    const [showPhotos, setShowPhotos] = useState(false);

    return (
        <div className="album-data">
            <span>{album.id}</span><br/>
            <label>{album.title}</label>
            <br />
            {showPhotos && (
                <div className="album-photos">
                    <Photos albumId={album.id} />
                </div>
            ) }

            <div className="post-buttons">
                <button onClick={() => setShowPhotos((prev) => !prev)}>
                    Photos
                </button>
                <button onClick={() => handleDeleteAlbum(album)}>delete</button>
            </div>
        </div>
    )
}
