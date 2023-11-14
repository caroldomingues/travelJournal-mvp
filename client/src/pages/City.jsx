import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./City.css";

export default function City() {
  const [entry, setEntry] = useState([
    { city_id: "", date: "", description: "", imgUrl: "" },
  ]);
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
    const response = await fetch(`/api/users/cities/${id}/entries`);
    const data = await response.json();
    setEntry(data);
  }

  async function deleteEntry(id) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      getEntriesFromCity();
      if (!response.ok) {
        const dataError = await response.json();
        throw new Error(dataError.message);
      }
    } catch (err) {
      console.error(err);
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
              </div>{" "}
              <button
                className="theButtonStyle"
                onClick={() => deleteEntry(e.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <br />{" "}
          </div>
        ))}
      </div>
      <Link to={`/cities/`}>
        <button className="theButtonStyle">Back to cities</button>
      </Link>{" "}
    </div>
  );
}
