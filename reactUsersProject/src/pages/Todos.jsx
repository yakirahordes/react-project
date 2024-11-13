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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState({isSearched: false, searchedTodos: []});
  const API_URL = useContext(UrlContext);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_URL}/todos?userId=${userId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        if (data.length === 0) setError("you have no todos yet");
        else {
          setTodosList(data);
          setError(null);
        }
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
    const randonId = Math.floor(Math.random() * (1000000 - 200)) + min;
    const newTodo = {
      id: randonId,
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
    setAdd(false);
  }
  function handleSearch(e) {
    setSearch(todosList)
    e.preventDefault();
    if(searchInput !== ''){
      let searched = todosList.filter(
        todo => todo.title.trim().toLowerCase().includes(searchInput.trim().toLowerCase()))
      if(searched.length === 0){
        searched = todosList.filter(todo =>
          todo.title === searchInput)
      }
      setSearch({isSearched: true, searchedTodos: searched});
    }
    // const regex = new RegExp(searchInput, 'i');
    // const searchedTodos = todosList.filter(todo => regex.test(todo.title))
    // setTodosList(searchedTodos)
  }
  return (
    <>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd(prev => !prev)}>add</button>
      {add && (
        <form>
          <label>title:</label><br/>
          <input onChange={(e) => setNewTitle(e.target.value)}></input><br/>
          <button onClick={addTodo}>save</button>
        </form>
      )}
      <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
      <button onClick={handleSearch}>search</button>
      <main className="todos-container">
        {!search.isSearched ? todosList.map((item) => {
          return (
            <Todo
              key={item.id}
              item={item}
              handleDeleteTodo={handleDeleteTodo}
              setError={setError}
            />
          );
        }) : search.searchedTodos.map((item) => {
          return (
            <Todo
              key={item.id + 'b'}
              item={item}
              handleDeleteTodo={handleDeleteTodo}
              setError={setError}
            />
          )})}
      </main>
    </>
  );
}
