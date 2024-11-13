import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../functions/API_URL";

export default function Info() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem("currentUserId"));
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchUsersData())();
  }, []);
  return (
    <>
      <h1>Info</h1>
      <label>name:</label>
      <br />
      <span>{userData?.name}</span>
      <br />
      <label>email:</label>
      <br />
      <span>{userData?.email}</span>
      <br />
      <label>phone:</label>
      <br />
      <span>{userData?.phone}</span>
      <br />
      <label>address</label>
      <br />
      <label>street:</label>
      <br />
      <span>{userData?.address?.street}</span>
      <br />
      <label>suite:</label>
      <br />
      <span>{userData?.address?.suite}</span>
      <br />
      <label>city:</label>
      <br />
      <span>{userData?.address?.city}</span>
      <br />
      <p>{error}</p>
    </>
  );
}
