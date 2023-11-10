import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  let [entry, setEntry] = useState([
    { city_id: "", date: "", description: "", imgUrl: "", city: "" },
  ]);
  let [cities, setCities] = useState([{ city: "" }]);

  useEffect(() => {
    getCities();
  }, []);
  // useEffect(() => console.log(cities), [cities]);

  function handleInputChange(event) {
    //does this working for matching the IDs ???
    let { name, value } = event.target;
    setEntry((entry) => ({ ...entry, [name]: value }));

    // setCities((cities) => ({ ...cities, [name]: value }));
  }

  function handleSubmit() {
    e.preventDefault();
    addEntry(e);
  }

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    // console.log(data);
    // console.log(cities);
    setCities(data);
  }

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
        my travel journal <i className="fa-solid fa-earth-americas"></i>
      </h1>

      <h2>add a new entry:</h2>

      <form className="form" onSubmit={handleSubmit}>
        {/* will this handleSubmit function work */}
        <div className="insideTheFormDiv">
          <div className="insideTheFormDivDiv">
            <label>Location</label>
            <br />
            <select
              value={entry.city_id}
              name="city_id"
              //the dream would be to set the city_id in 'entries' to the same value as the city id in 'cities'
              //how do i do that?
              onChange={handleInputChange}
            >
              <option> Select a city </option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.city}
                </option>
              ))}
              <option value={0}>Add a new city</option>
            </select>

            {entry.city_id === "0" && (
              <input
                class="form-control"
                type="text"
                value={entry.city}
                name="city"
                onChange={handleInputChange}
                placeholder="What city are you in..."
              />
            )}
            <br />
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
