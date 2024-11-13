import React, { useEffect, useContext, useState } from "react";
import { UrlContext } from "../context/API_URL";
import apiRequest from "../components/apiRequest";
import Comment from "./Comment";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [newBody, setNewBody] = useState("");
  const [commentingUserId, setCommentingUserId] = useState();
  const API_URL = useContext(UrlContext);

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

  async function handleDeleteComment(commentItem) {
    const newCommentList = comments.filter(
      (comment) => comment.id !== comentItem.id
    );
    setPosts(newCommentList);
    const deleteOption = {
      method: "DELETE",
    };
    const url = `${API_URL}/comments/${commentItem.id}`;
    const result = await apiRequest(url, deleteOption);
    setError(result.errMsg);
  }

  async function addComment(e) {
    e.preventDefault();
    const newComment = {
      postId: postId,
      id: randomNum,
      commentingUserId: commentingUserId,
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

  const randomNum = Math.floor(Math.random(1000000 - 500 + 1) -500);

  return (
    <>
      {error !== null && <p>{error}</p>}
      <button onClick={() => setAdd(prev => !prev)}>add</button>
      {add && (
        <form>
          <label>Commenting user id:</label>
          <input onChange={(e) => setCommentingUserId(e.target.value)}></input>
          <label>Body:</label>
          <input onChange={(e) => setNewBody(e.target.value)}></input>
          <button onClick={addComment}>save</button>
        </form>
      )}
      <main className="comments-container">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              post={comment}
              handleDeleteComment={handleDeleteComment}
              setError={setError}
            />
          );
        })}
      </main>
    </>
  );
}
