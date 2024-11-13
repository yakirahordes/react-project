import React, { useEffect, useState } from "react";
import apiRequest from "../components/apiRequest";
import { API_URL } from "../functions/API_URL";
import Comment from "./Comment";
import { handleDelete } from "../functions/delete";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [newBody, setNewBody] = useState("");
  const [commentingUsername, setCommentingUsername] = useState();

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const response = await fetch(`${API_URL}/comments?postId=${postId}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        if (data.length === 0) setError("You have no comments");
        else {
          setComments(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    (async () => await fetchCommentsData())();
  }, []);

  // async function handleDeleteComment(commentItem) {
  //   const newCommentList = comments.filter(
  //     (comment) => comment.id !== commentItem.id
  //   );
  //   setComments(newCommentList);
  //   const deleteOption = {
  //     method: "DELETE",
  //   };
  //   const url = `${API_URL}/comments/${commentItem.id}`;
  //   const result = await apiRequest(url, deleteOption);
  //   setError(result.errMsg);
  // }
  function handledeleteItem(item) {
    handleDelete(comments, item, setComments, "comments", setError);
  }

  async function addComment(e) {
    e.preventDefault();
    const newComment = {
      postId: postId,
      id: randomNum.toString(),
      name: commentingUsername,
      body: newBody,
    };

    const postOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    };
    const result = await apiRequest(`${API_URL}/comments`, postOption);
    setError(result.errMsg);
    setComments((prev) => [...prev, result.data]);
    setAdd(false);
  }

  const randomNum = Math.floor(Math.random() * 4001);

  return (
    <>
      {error !== null && <p>{error}</p>}

      <main className="comments-container">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              handledeleteItem={handledeleteItem}
            />
          );
        })}
      </main>
      <button onClick={() => setAdd(true)}>add</button>
      {add && (
        <form>
          <label>Commenting user name:</label>
          <input
            onChange={(e) => setCommentingUsername(e.target.value)}
          ></input>
          <label>Body:</label>
          <input onChange={(e) => setNewBody(e.target.value)}></input>
          <button onClick={addComment}>save</button>
        </form>
      )}
    </>
  );
}
