import React, { useState } from "react";
import { API_URL } from "../functions/API_URL";
import apiRequest from "./apiRequest";

export default function Todo({ item, deleteItem, setError }) {
  const [isChecked, setIsChecked] = useState(item.completed);
  const [title, setTitle] = useState(item.title);
  const [isEdited, setIsEdited] = useState(false);

  async function handleChecked(e) {
    setIsChecked(e.target.checked);
    const url = `${API_URL}/todos/${item.id}`;
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !isChecked,
      }),
    };
    const result = await apiRequest(url, updateOption);
    // setError(result.errMsg);
  }
  async function handleSaveChanges() {
    const url = `${API_URL}/todos/${item.id}`;
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    };
    const result = await apiRequest(url, updateOption);
    setError(result.errMsg);
    setIsEdited(false);
  }
  return (
    <div className="todo-div" key={item.id}>
      <span>{item.id}</span>
      <br />
      {isEdited ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <label>{title}</label>
      )}
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <br />
      <div>
        {!isEdited ? (
          <button onClick={() => setIsEdited(true)}>edit</button>
        ) : (
          <button onClick={handleSaveChanges}>save</button>
        )}
        <button onClick={() => deleteItem(item)}>delete</button>
      </div>
    </div>
  );
}
