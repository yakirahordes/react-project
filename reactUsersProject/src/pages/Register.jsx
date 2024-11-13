import React, { useState, useEffect } from "react";
import { API_URL } from "../functions/API_URL";
import { useNavigate } from "react-router-dom";
import apiRequest from "../components/apiRequest";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
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

  async function handleSubmit(e) {
    e.preventDefault();
    let isExists = await isExist();
    if (isExists !== null) {
      navigate("/details");
    }
  }

  async function isExist() {
    if (password !== verifyPassword) {
      setError("Verified password does not equal to password");
      return false;
    } else {
      const currentUser = usersData.filter(
        (user) => user.username === username
      );
      if (currentUser.length === 0) {
        const newUser = {
          id: randomNum.toString(),
          username: username,
          website: password,
        };

        const postOption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        };
        const result = await apiRequest(`${API_URL}/users`, postOption);
        setError(result.errMsg);
        if (result.data) {
          localStorage.setItem(
            "currentUserId",
            JSON.stringify(result.data.id.toString())
          );
          return true;
        } else {
          return false;
        }
      } else {
        setError("this username exists");
        return null;
      }
    }
  }

  const randomNum = Math.floor(Math.random() * 5000);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Verify Password:</label>
      <input
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <button>Submit</button>
      <p>{error}</p>
    </form>
  );
}
