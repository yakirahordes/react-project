import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { handleDelete } from "../functions/delete";
import { fetchData } from "../functions/fetchdata";
import { addItem } from "../functions/add";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [newBody, setNewBody] = useState("");
  const [commentingUsername, setCommentingUsername] = useState();

  useEffect(() => {
    (async () =>
      await fetchData(
        `comments?postId=${postId}`,
        "comments",
        setComments,
        setError
      ))();
  }, []);

  function handledeleteItem(item) {
    handleDelete(comments, item, setComments, "comments", setError);
  }

  function addComment(e) {
    const newComment = {
      postId: parseInt(postId),
      name: commentingUsername,
      body: newBody,
    };
    addItem(e, newComment, "comments", setError, setComments, setAdd);
  }

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
      <button onClick={() => setAdd((prev) => !prev)}>add</button>
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
