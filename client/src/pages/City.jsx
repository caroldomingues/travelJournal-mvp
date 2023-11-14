import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./City.css";

export default function City() {
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
      if (response.ok) {
        const data = await response.json();
        setCity(data);
      } else {
        console.log("Not able to fetch the data");
      }
    } catch (err) {
      res.status(500).send(err);
    }
    console.log(city);
  }

  async function getEntriesFromCity() {
    const response = await fetch(`/api/users//cities/${id}/entries`);
    const data = await response.json();
    setEntry(data);
  }

  async function deleteEntry(id) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const dataError = await response.json();
        throw new Error(dataError.message);
      }
      const data = await response.text();
      const parsedData = data ? JSON.parse(data) : {};
      getEntriesFromCity();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bodyOfEntry">
      <h1>{city[0].city}</h1>
      <div>
        <br />
        {entry.map((e) => (
          <div>
            {" "}
            <div className="singleEntry">
              <div className="dateAtEntry">{e.date}</div>
              <p className="descriptionStyling">{e.description}</p>
              <div className="smth"></div>
              <div>
                <img className="imgAtEntry" src={e.imgUrl} />
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      <Link to={`/cities/`}>
        <button className="theButtonStyle">Back to cities</button>
      </Link>{" "}
      <button
        className="theButtonStyle"
        onClick={() => deleteEntry(entry[0].id)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>{" "}
    </div>
  );
}
