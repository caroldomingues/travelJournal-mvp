import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Entries.css";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    getEntries();
    getCities();
  }, []);

  async function getEntries() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setEntries(data);
  }

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    setCities(data);
  }

  function getTheNameOfTheCity() {
    for (let c in cities) {
      if (c.id === entry.city_id) {
        return c;
      }
    }
  }

  return (
    <div className="bodyOfEntries">
      <h1 className="theH1">entries:</h1>
      <div className="aroudAllEntries">
        <div class="row">
          {entries.map((e) => (
            <div key={e.id} class="col-sm-3">
              <Link to={`/entries/${e.id}`} className="linkStyles">
                <div class="card text-bg">
                  <img
                    className="imgStylingAtEntry"
                    width={600}
                    src={e.imgUrl}
                  />
                  <div className="card-img-overlay">
                    <h3 className="linkStyles">{getTheNameOfTheCity}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Link to={"/"}>
        <button>Add a new entry!</button>
      </Link>

      {/* <Outlet /> */}
    </div>
  );
}
