import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import { handleDelete } from "../functions/delete";
import { fetchData } from "../functions/fetchdata";
import { addItem } from "../functions/add";
import { searchItem } from "../functions/search";

export default function Todos() {
  const [error, setError] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState({
    isSearched: false,
    searchedItems: [],
  });
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  useEffect(() => {
    (async () =>
      await fetchData(
        `todos?userId=${userId}`,
        "todos",
        setTodosList,
        setError
      ))();
  }, []);

  function deleteItem(item) {
    handleDelete(todosList, item, setTodosList, "todos", setError);
  }

  function addTodo(e) {
    const newTodo = {
      userId: parseInt(userId),
      title: newTitle,
      completed: false,
    };
    addItem(e, newTodo, "todos", setError, setTodosList, setAdd);
  }

  function handleSearch(e) {
    searchItem(e, searchInput, todosList, setSearch);
  }

  function sortTodos() {
    const sortedTodos = todosList.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
    const sortedSearchedTodos = search?.searchedItems?.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
    setSearch((prev) => ({ ...prev, searchedTodos: sortedSearchedTodos }));
    setTodosList(sortedTodos);
  }

  return (
    <>
      <h1>Todos</h1>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
      {add && (
        <form>
          <label>title:</label>
          <br />
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <br />
          <button onClick={addTodo}>save</button>
        </form>
      )}
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
      <button onClick={sortTodos}>sort</button>
      <main className="todos-container">
        {!search.isSearched
          ? todosList.map((item) => {
              return (
                <Todo
                  key={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  setError={setError}
                />
              );
            })
          : search.searchedItems.map((item) => {
              return (
                <Todo
                  key={item.id + "b"}
                  item={item}
                  deleteItem={deleteItem}
                  setError={setError}
                />
              );
            })}
      </main>
    </>
  );
}
