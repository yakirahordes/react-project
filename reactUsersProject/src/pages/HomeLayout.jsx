import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { API_URL } from "../functions/API_URL";

export default function HomeLayout() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchUsersData())();
  }, []);

  return (
    <>
      <NavBar />
      {error != null && <p>{error}</p>}
      <h2>Hello {user.name}!</h2>
      <div className="home-body">
        <Outlet />
      </div>
    </>
  );
}
