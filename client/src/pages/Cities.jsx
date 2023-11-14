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
    const response = await fetch("/api/users");
    const data = await response.json();
    setEntries(data);
  }

  async function getCities() {
    const response = await fetch("/api/users/cities");
    const data = await response.json();
    setCities(data);
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
              </Link>
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

  // <div className="bodyOfEntries">
  //   <h1 className="theH1">entries:</h1>
  //   <div className="aroudAllEntries">
  //     <div className="row">
  //       {cities.map((c) => (
  //         <div key={c.id} className="col-sm-3">
  //           <Link to={`/cities/${c.id}`} className="linkStyles">
  //             <div className="card text-bg">
  //               <h3 className="linkStyles">{c.city}</h3>
  //               <div className="card-img-overlay"></div>
  //               {entries.map((e) => (
  //                 <div key={e.id}>
  //                   {e.id === c.id && (
  //                     <div>
  //                       <img
  //                         className="imgStyle"
  //                         src={e["MIN(entries.imgUrl)"]}
  //                       />
  //                     </div>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </Link>
  //         </div>
  //       ))}
  //     </div>
  //     <div></div>
  //   </div>
  //   <br />
  //   <Link to={"/"}>
  //     <button className="buttonStyle">Add a new entry!</button>
  //   </Link>
  // </div>

  /* <div className="card-img-overlay">
  {cities.map((c) => (
    {e.city_id === c.id &&  <h3 className="linkStyles">
    {c.city}
    </h3>}
    ))}
    </div> */
}

{
  /* {entries.map((e) => (
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
        ))} */
}

{
  /* <div>
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
      </div> */
}
