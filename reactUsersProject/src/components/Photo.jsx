import React from 'react'

export default function Photo({ photo, handleDeletePhoto, setError }) {

    return (
        <div className='photo-div'>
            <img src={photo.thumbnailUrl} />
            <button onClick={() => handleDeletePhoto(photo)}>
                delete Photo
            </button>
        </div>
    )
}
