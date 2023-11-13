import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Entry.css";

export default function Entry() {
  const [entry, setEntry] = useState([
    { city_id: "", date: "", description: "", imgUrl: "" },
  ]); //i want to put an actual loading thingy instead of default values, is that possible?
  const { id } = useParams();
  let [city, setCity] = useState([]);

  useEffect(() => {
    getEntry();
    getCities();
  }, [id]);

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    setCity(data);
  }

  async function getEntry() {
    const response = await fetch(`/api/users/${id}`);
    if (response.ok) {
      const data = await response.json();
      setEntry(data);
    } else {
      console.log("Not able to fetch the data");
    }
    // catch (err) {
    //   res.status(500).send(err);
    // }
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
      getEntries();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bodyOfEntry">
      <div>{entry.city_id === city.id && <h1>{city.city}</h1>}</div>
      {/* <h2>{entry[0].city_id}</h2> */}
      {/* {entry.map((e) => (<div>{
        city.map((c) => <div>{e.city_id === c.id && <h1>{c.city}</h1>}</div>);
      }</div>))} */}

      {entry.map((e) => (
        <div>
          <div>
            {city.map((c) => (
              <div>{e.city_id === c.id && <h1>{c.city}</h1>}</div>
            ))}
          </div>
          <div>{e.date}</div>
          <div className="smth"></div>
          <p className="descriptionStyling">{e.description}</p>
          <div className="smth"></div>
          <div>
            <img className="imgAtEntry" src={e.imgUrl} />
          </div>
        </div>
      ))}

      <Link to={`/entries/`}>
        <button>Back to entries</button>
        <button onClick={() => deleteEntry(entry[0].id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </Link>
    </div>
  );
}
