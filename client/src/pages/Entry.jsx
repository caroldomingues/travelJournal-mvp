import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Entry() {
  const [entry, setEntry] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getEntry();
  }, [id]);

  async function getEntry() {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    setEntry(data);

    console.log(data);
  }
  console.log(entry);
  return (
    <div>
      hi
      <h2>{entry[0].destination}</h2>
      <div>{entry[0].day}</div>
      <p>{entry[0].description}</p>
      <img width={700} src={entry[0].img_url} />
    </div>
  );
}
