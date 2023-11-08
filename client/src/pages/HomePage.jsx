import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  let [entry, setEntry] = useState([
    { destination: "", day: "", description: "", img_url: "" },
  ]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEntry((entry) => ({ ...entry, [name]: value }));
  }

  console.log(entry);

  async function addEntry(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message);
      //can i show the message from the backend here?
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Add a new entry!</h2>
      <form onSubmit={addEntry}>
        <label>Where are you?</label>
        <input
          type="text"
          value={entry.destination}
          name="destination"
          onChange={handleInputChange}
        />

        <label>What did you do?</label>
        <input
          type="text"
          value={entry.description}
          name="description"
          onChange={handleInputChange}
        />

        <label>What is the date?</label>
        <input
          type="date"
          value={entry.day}
          name="day"
          onChange={handleInputChange}
        />

        <label>Share a picture</label>
        <input
          type="text"
          value={entry.img_url}
          name="img_url"
          onChange={handleInputChange}
        />

        <button>Submit entry</button>
      </form>
      <Link to={"/entries"}>
        <button>Entries</button>
      </Link>
    </div>
  );
}
