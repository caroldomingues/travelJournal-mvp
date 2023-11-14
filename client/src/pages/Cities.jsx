import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cities.css";

export default function Cities() {
  const [entries, setEntries] = useState([
    { "MIN(entries.imgUrl)": "", id: 0, city: "" },
  ]);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    getFirstEntryFromEachCity();
    getCities();
  }, []);

  async function getFirstEntryFromEachCity() {
    const response = await fetch("/api/users/entry");
    const data = await response.json();
    setEntries(data);
  }

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    setCities(data);
    console.log(cities);
    console.log(entries);
    entries.map((e) => console.log(e));
  }

  async function deleteCity(id) {
    try {
      const response = await fetch(`/api/users/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        // const dataError = await response.json();
        throw new Error(dataError.message);
      }
      const data = await response.text();
      getCities();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bodyOfEntries">
      <h1 className="theH1">Cities:</h1>
      <div className="aroudAllEntries">
        <div className="row">
          {cities.map((c) => (
            <div key={c.id} className="col-md-3 mb-4">
              <Link to={`/cities/${c.id}`} className="linkStyles">
                <div className="card text-bg">
                  {entries.map((e) => (
                    <div key={e.id}>
                      {e.id === c.id && (
                        <div>
                          <img
                            className="card-img-top imgStyle"
                            src={e["MIN(entries.imgUrl)"]}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="card-img-overlay">
                    <h3 className="linkStyles">{c.city}</h3>
                  </div>
                </div>
              </Link>{" "}
              <button
                className="deleteButtonStyle"
                onClick={() => deleteCity(c.id)}
              >
                Delete city <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}{" "}
        </div>
      </div>
      <br />
      <Link to={"/"}>
        <button className="buttonStyle">Add a new entry!</button>
      </Link>{" "}
    </div>
  );
}
