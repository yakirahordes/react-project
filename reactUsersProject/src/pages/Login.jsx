import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../functions/fetchdata";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const userId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await fetchData(`users`, "data", setUsersData, setError))();
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
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
    // const handlePopState = (e) => {
    //   window.history.pushState(null, document.title, window.location.href);
    // };
    // window.history.pushState(null, document.title, window.location.href);
    // window.onpopstate = handlePopState;
    // return () => {
    //   window.onpopstate = null;
    // };
  },[]);

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="inside-form">Login</h1>
      <label className="inside-form">Username:</label>
      <input
        className="inside-form"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label className="inside-form">Password:</label>
      <input
        className="inside-form"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="inside-form">Submit</button>
      <br />
      <Link className="inside-form" to="/register">
        Sign Up
      </Link>
      <p className="inside-form">{error}</p>
    </form>
  );
}
