import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Entries.css";

export default function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries();
  }, []);

  async function getEntries() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setEntries(data);
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
                    src={e.img_url}
                  />
                  <div className="card-img-overlay">
                    <h3 className="linkStyles">{`${e.city_id}`}</h3>
                  </div>
                </div>
                {/* i want to be able to display
            as many images as the person submits, but how do i do that? cause
            the entry is an object so i cant map through it to get an image to
            show for every img_url, so is there another way for me to do this? */}
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
