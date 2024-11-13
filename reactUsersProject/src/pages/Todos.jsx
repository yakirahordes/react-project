import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlContext } from "../context/API_URL";
import Todo from "../components/Todo";
import apiRequest from "../components/apiRequest";

export default function Todos() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const API_URL = useContext(UrlContext);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/todos?userId=${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        console.log(data);
        setTodosList(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchUsersData())();
  }, []);

  async function handleDeleteTodo(item) {
    const newTodosList = todosList.filter((todo) => todo.id !== item.id);
    setTodosList(newTodosList);
    const deleteOption = {
      method: "DELETE",
    };
    const url = `${API_URL}/todos/${item.id}`;
    const result = await apiRequest(url, deleteOption);
    setError(result.errMsg);
  }
  async function addTodo(e) {
    e.preventDefault();
    const newTodo = {
      userId: userId,
      title: newTitle,
      completed: false,
    };

    const postOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    };
    const result = await apiRequest(`${API_URL}/todos`, postOption);
    setError(result.errMsg);
    setTodosList((prev) => [...prev, result.data]);
  }

  return (
    <>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd(true)}>add</button>
      {add && (
        <form>
          <label>title:</label>
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <button onClick={addTodo}>save</button>
        </form>
      )}
      <main className="todos-container">
        {todosList.map((item) => {
          return (
            <Todo
              key={item.id}
              item={item}
              handleDeleteTodo={handleDeleteTodo}
              setError={setError}
            />
          );
        })}
      </main>
    </>
  );
}
