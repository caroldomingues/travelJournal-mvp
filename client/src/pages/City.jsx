import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./City.css";

export default function Entry() {
  const [entry, setEntry] = useState([
    { city_id: "", date: "", description: "", imgUrl: "" },
  ]); //i want to put an actual loading thingy instead of default values, is that possible?
  const { id } = useParams();
  let [city, setCity] = useState([{ city: "" }]);

  useEffect(() => {
    getEntriesFromCity();
    getCity();
  }, [id]);

  async function getCity() {
    try {
      const response = await fetch(`/api/users/cities/${id}`);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setCity(data);
        console.log(city);
      } else {
        console.log("Not able to fetch the data");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function getEntriesFromCity() {
    const response = await fetch(`/api/users//cities/${id}/entries`);
    const data = await response.json();
    setEntry(data);
    console.log(entry);
  }

  async function deleteEntry(id) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      getEntry();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bodyOfEntry">
      <h1>{city[0].city}</h1>
      <div>
        <br />
        <div className="singleEntry">
          <div className="dateAtEntry">{entry[0].date}</div>
          <p className="descriptionStyling">{entry[0].description}</p>
          <div className="smth"></div>
          <div>
            <img className="imgAtEntry" src={entry[0].imgUrl} />
          </div>
        </div>
      </div>
      <Link to={`/cities/`}>
        <button>Back to cities</button>
        <button onClick={() => deleteEntry(entry[0].id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </Link>{" "}
    </div>
  );
}
