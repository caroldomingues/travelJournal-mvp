import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cities.css";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    getEntries();
    getCities();
    // getTheNameOfTheCity();
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

  // im very aware that this doest make any sense but idk how to make it make sense, i am very confused
  return (
    <div className="bodyOfEntries">
      <h1 className="theH1">entries:</h1>
      <div className="aroudAllEntries">
        <div className="row">
          {cities.map((c) => (
            <div key={c.id} className="col-sm-3">
              <Link to={`/cities/${c.id}`} className="linkStyles">
                <div className="card text-bg">
                  <div className="card-img-overlay">
                    <h3 className="linkStyles">{c.city}</h3>
                  </div>
                  {/* <div>
                    {entries.map((e) => (
                      <div>
                        {e.city_id === c.id && (
                          <img
                            className="imgStylingAtEntry"
                            width={300}
                            height={200}
                            src={e.imgUrl}
                          />
                        )}
                      </div>
                    ))}
                  </div> */}
                </div>
              </Link>
            </div>
          ))}
          {/* {entries.map((e) => (
            <div key={e.id} class="col-sm-3">
              <Link to={`/entries/${e.id}`} className="linkStyles">
                <div class="card text-bg">
                  <img
                    className="imgStylingAtEntry"
                    width={300}
                    height={200}
                    src={e.imgUrl}
                  />
                  <div className="card-img-overlay">
                    {cities.map((c) => (
                      <h3 className="linkStyles">{c.city}</h3>
                    ))}
                  </div>
                 
                </div>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
      <Link to={"/"}>
        <button>Add a new entry!</button>
      </Link>
      {/* <Outlet /> */}
    </div>
  );
}
{
  /* <div className="card-img-overlay">
                    {cities.map((c) => (
                      {e.city_id === c.id &&  <h3 className="linkStyles">
                      {c.city}
                      </h3>}
                    ))}
                  </div> */
}
