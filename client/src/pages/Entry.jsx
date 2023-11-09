import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Entry.css";

export default function Entry() {
  const [entry, setEntry] = useState([
    { destination: "", day: "", description: "", img_url: "" },
  ]); //i want to put an actual loading thingy instead of default values, is that possible?
  const { id } = useParams();

  useEffect(() => {
    getEntry();
  }, [id]);

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
      <h2>{entry[0].destination}</h2>

      <div>{entry[0].day}</div>
      <div className="smth"></div>
      <p className="descriptionStyling">{entry[0].description}</p>
      <div className="smth"></div>
      <div>
        <img className="imgAtEntry" src={entry[0].img_url} />
      </div>

      <Link to={`/entries/`}>
        <button>Back to entries</button>
        <button onClick={() => deleteEntry(entry[0].id)}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </Link>
    </div>
  );
}
