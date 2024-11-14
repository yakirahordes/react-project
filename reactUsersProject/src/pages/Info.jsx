import React, { useEffect, useState } from "react";
import { fetchData } from "../functions/fetchdata";

export default function Info() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    (async () =>
      await fetchData(`users/${userId}`, "data", setUserData, setError))();
  }, []);

  return (
    <>
      <h1>Info</h1>
      <div className="info-container">
        <div className="info-detail">
          <label>name:</label>
          <br />
          <span>{userData?.name}</span>
          <br />
        </div>
        <div className="info-detail">
          <label>email:</label>
          <br />
          <span>{userData?.email}</span>
          <br />
        </div>
        <div className="info-detail">
          <label>phone:</label>
          <br />
          <span>{userData?.phone}</span>
          <br />
        </div>
        <div className="info-detail">
          <label>address:</label>
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
        </div>
        <p>{error}</p>
      </div>
    </>
  );
}
