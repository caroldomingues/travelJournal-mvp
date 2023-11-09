import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  let [entry, setEntry] = useState([
    { city_id: "", date: "", description: "", imgUrl: "" },
  ]);
  let [city, setCity] = useState([{ city: "" }]);

  function handleInputChange(event) {
    let { name, value } = event.target;
    setEntry((entry) => ({ ...entry, [name]: value }));
  }

  console.log(entry);

  async function addCity(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message);
      setCity({ city: "" });
      //can i show the message from the backend here?
    } catch (err) {
      console.log(err);
    }
  }

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
      setEntry({ city_id: "", date: "", description: "", imgUrl: "" });
      //can i show the message from the backend here?
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div class="bodyOfHomePage">
      <h1>
        my travel journal <i class="fa-solid fa-earth-americas"></i>
      </h1>

      <h2>add a new entry:</h2>

      <form class="form" onSubmit={addEntry}>
        <div className="insideTheFormDiv">
          <div className="insideTheFormDivDiv">
            <label>Location</label>
            <input
              class="form-control"
              type="text"
              value={entry.city_id}
              name="destination"
              onChange={handleInputChange}
              placeholder="What city are you in..."
            />
            <label>Description</label>
            <input
              class="form-control"
              type="text"
              value={entry.description}
              name="description"
              onChange={handleInputChange}
              placeholder="What did you do? Did you see anything interesting?"
            />
            <label>Date</label>
            <input
              class="form-control"
              type="date"
              value={entry.date}
              name="day"
              onChange={handleInputChange}
            />
            <label>Share a picture</label>
            <input
              class="form-control"
              type="text"
              value={entry.imgUrl}
              name="img_url"
              onChange={handleInputChange}
              placeholder="Something you want to remember"
            />
          </div>
        </div>

        <button className="buttonStyling">
          Submit <i class="fa-regular fa-paper-plane"></i>
        </button>
      </form>

      <Link to={"/entries"}>
        <button className="buttonStyling">Entries</button>
      </Link>
    </div>
  );
}
