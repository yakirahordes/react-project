import React, { useState } from "react";
import { API_URL } from "../functions/API_URL";
import { useNavigate } from "react-router-dom";
import apiRequest from "../functions/apiRequest";

export default function Details() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", suite: "", city: "" });
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      phone !== "" &&
      address.street !== "" &&
      address.suite !== "" &&
      address.city !== ""
    ) {
      const userId = JSON.parse(localStorage.getItem("currentUserId"));
      const url = `${API_URL}/users/${userId}`;
      const updateOption = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          address: {
            street: address.street,
            suite: address.suite,
            city: address.city,
          },
          phone: phone,
        }),
      };
      const result = await apiRequest(url, updateOption);
      setError(result.errMsg);
      if (result.errMsg === null) {
        navigate(`/home/${userId}`, { replace: true });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Details</h1>
      <label>name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>email:</label>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>phone:</label>
      <input
        value={phone}
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
      />
      <label>adress:</label>
      <label>street:</label>
      <input
        value={address.street}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, street: e.target.value }))
        }
      />
      <label>suite:</label>
      <input
        value={address.suite}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, suite: e.target.value }))
        }
      />
      <label>city:</label>
      <input
        value={address.city}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, city: e.target.value }))
        }
      />
      <button>Submit</button>
      <p>{error}</p>
    </form>
  );
}
