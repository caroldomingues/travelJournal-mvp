import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  let [entry, setEntry] = useState({
    city_id: "",
    date: "",
    description: "",
    imgUrl: "",
    city: "",
  });
  let [cities, setCities] = useState([{ city: "" }]);

  useEffect(() => {
    getCities();
  }, []);

  function handleInputChange(event) {
    //does this working for matching the IDs ???
    let { name, value } = event.target;
    setEntry({ ...entry, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addEntry(e);
  }

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    setCities(data);
  }

  async function addEntry(e) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      console.log(response);
      const data = await response.json();

      console.log(data);
      if (!response.ok) throw new Error(data.message);
      setEntry({
        city_id: "",
        date: "",
        description: "",
        imgUrl: "",
        city: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bodyOfHomePage">
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
              onChange={handleInputChange}
            >
              <option> Select a city</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.city}
                </option>
              ))}
              <option value={0}>Add a new city</option>
            </select>

            {entry.city_id === "0" && (
              <input
                className="form-control"
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
              className="form-control"
              type="text"
              value={entry.description}
              name="description"
              onChange={handleInputChange}
              placeholder="What did you do? Did you see anything interesting?"
            />
            <label>Date</label>
            <input
              className="form-control"
              type="date"
              value={entry.date}
              name="date"
              onChange={handleInputChange}
            />
            <label>Share a picture</label>
            <input
              className="form-control"
              type="text"
              value={entry.imgUrl}
              name="imgUrl"
              onChange={handleInputChange}
              placeholder="Something you want to remember"
            />
          </div>
        </div>

        <button className="buttonStyling">
          Submit <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>

      <Link to={"/cities"}>
        <button className="buttonStyling">Cities</button>
      </Link>
      <img
        className="bottomRightImage"
        src="https://cdn-icons-png.flaticon.com/256/7496/7496821.png"
      />
      <img
        className="bottomLeftImage"
        src="https://images.vexels.com/media/users/3/156708/isolated/preview/6f332cc60f7c82059eeeed0a5730aa7d-flight-ticket-icon.png"
      />
      <img
        className="topLeftImage"
        src="https://cdn-icons-png.flaticon.com/512/3165/3165890.png"
      />
      <img
        className="topRightImage"
        src="https://www.armadalib.org/images/memoir.png/@@images/image.png"
      />
    </div>
  );
}
