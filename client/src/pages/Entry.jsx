import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <h2>{entry[0].destination}</h2>
      <div>{entry[0].day}</div>
      <p>{entry[0].description}</p>
      <img width={700} src={entry[0].img_url} />
      <Link to={`/entries/`}>
        <button>Back to entries</button>
      </Link>
    </div>
  );
}
