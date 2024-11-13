import React, { useState, useEffect } from "react";
import { API_URL } from "../functions/API_URL";
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const userId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setUsersData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchUsersData())();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const currentUser = checkUserData();
    if (currentUser) {
      navigate(`/home/${currentUser.id}`);
    } else {
      setError("this user does not exist");
    }
  }

  function checkUserData() {
    const currentUser = usersData.filter(
      (user) => user.username === username && user.website === password
    )[0];
    localStorage.setItem(
      "currentUserId",
      JSON.stringify(currentUser?.id) || null
    );
    return currentUser;
  }

  useEffect(() => {
    const handlePopState = (e) => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.history.pushState(null, document.title, window.location.href);
    window.onpopstate = handlePopState;
    return () => {
      window.onpopstate = null;
    };
  });

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Submit</button>
      <button onClick={() => navigate("/register", { replace: true })}>
        Register
      </button>
      <p>{error}</p>
    </form>
  );
}
