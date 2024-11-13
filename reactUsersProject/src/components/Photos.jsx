import React, { useState, useContext, useEffect } from 'react'
import { UrlContext } from '../context/API_URL';
import Album from './Album';
import Photo from './Photo';
import apiRequest from './apiRequest';

export default function Photos({ albumId }) {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [photoAddress, setPhotoAddress] = useState('');
    const [add, setAdd] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [startIndex, setStartIndex] = useState(0)
    const API_URL = useContext(UrlContext);
    useEffect(() => {
        (async () => await fetchPhotosData())();
    }, []);
    const fetchPhotosData = async () => {
        try {
            const response = await fetch(`${API_URL}/photos?_start=${startIndex}&_limit=5&albumId=${albumId}`);
            if (!response.ok) throw Error("Did not receive expected data");
            const data = await response.json();
            console.log(data);
            if(data.length === 0 && photos.length !== 0){
                setError("There is no more photos");
            }
            else{
                if (data.length === 0 && photos.length ===0) setError("You have no photos");
                else {
                    if(photos.length === 0){
                        setPhotos(data);
                    }
                    else{
                        setPhotos(prev => [...prev, ...data]);
                    }
                    setError(null);
                    setStartIndex(prev => prev + 5);
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };
    async function handleDeletePhoto(photoItem) {
        const newPhotosList = photos.filter(
            (photo) => photo.id !== photoItem.id
        );
        console.log(photoItem.id)
        setPhotos(newPhotosList);
        const deleteOption = {
            method: "DELETE",
        };
        const url = `${API_URL}/photos/${photoItem.id}`;
        const result = await apiRequest(url, deleteOption);
        setError(result.errMsg);
    }

    async function addPhoto(e) {
        e.preventDefault();
        const newPhoto = {
            albumId: albumId,
            id: randomNum,
            title: newTitle,
            url: photoAddress,
            thumbnailUrl: photoAddress
        };

        const postOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPhoto),
        };
        const result = await apiRequest(`${API_URL}/photos`, postOption);
        setError(result.errMsg);
        setPhotos((prev) => [...prev, result.data]);
        setAdd(false);
    }

    const randomNum = Math.floor(Math.random(1000000 - 5000 + 1) + 5000);


    return (
        <>
            {error !== null && <p>{error}</p>}
            <button onClick={() => setAdd(prev => !prev)}>add</button>
            {add && (
                <form>
                    <label>photo title:</label>
                    <input onChange={(e) => setNewTitle(e.target.value)}></input>
                    <label>photo adress:</label>
                    <input onChange={(e) => setPhotoAddress(e.target.value)}></input>
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
                <button onClick={fetchPhotosData}>show more</button>
            </main>
        </>
    )
}
