import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [entry, setEntry] = useState([]);

  function handleInputChange(event) {
    setEntry(event.target.value);
    console.log(entry);
  }

  async function addEntry(e) {
    e.preventDefault();
    try {
      const response = fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      const data = (await response).json();
      if (!response.ok) throw new Error(data.message);
      //can i show the message from the backend here?
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Add a new entry!</h2>
      <form>
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
          name="img"
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
