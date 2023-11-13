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
  let [city, setCity] = useState([]);

  useEffect(() => {
    getEntries();
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

  async function getEntries() {
    const response = await fetch("/api/users/");
    const data = await response.json();
    setEntry(data);
  }

  // async function getCities() {
  //   const response = await fetch("/api/users/cities");
  //   const data = await response.json();
  //   setCity(data);
  // }

  // async function getEntry() {
  //   try {
  //     const response = await fetch(`/api/users/${id}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setEntry(data);
  //     } else {
  //       console.log("Not able to fetch the data");
  //     }
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // }

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
      {/* {city.map((c) => (
        <div>
          {entry.map((e) => (
            <div>{e.city_id === c.id && <h1>{c.city}</h1>}</div>
          ))}
        </div>
      ))}
      {entry.map((e) => (
        <div>
          <div></div>
          <br />
          <div className="singleEntry">
            <div className="dateAtEntry">{e.date}</div>
            <p className="descriptionStyling">{e.description}</p>
            <div className="smth"></div>
            <div>
              <img className="imgAtEntry" src={e.imgUrl} />
            </div>
          </div>
        </div>
      ))} */}
      <Link to={`/cities/`}>
        <button>Back to cities</button>
        <button onClick={() => deleteEntry(entry[0].id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </Link>
    </div>
  );
}
