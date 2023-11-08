import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  let [entry, setEntry] = useState([
    { destination: "", day: "", description: "", img_url: "" },
  ]);

  useEffect(() => {
    getEntries();
  }, []);

  async function getEntries() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setEntries(data);
    console.log(data);
  }

  async function deleteEntry(id) {
    console.log(id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      getEntries();
    } catch (err) {
      console.log(err);
    }
    console.log("hi");
  }

  return (
    <div>
      <h1>My travel journal!</h1>
      <div>Entries!</div>
      <div>
        {entries.map((e) => (
          <div key={e.id}>
            <Link to={`/entries/${e.id}`}>
              <div>
                <h3>{`${e.destination}`}</h3>
                <img width={600} src={e.img_url} />
              </div>
            </Link>
            <button onClick={() => deleteEntry(e.id)}>Delete</button>
            {/* i want to be able to display
            as many images as the person submits, but how do i do that? cause
            the entry is an object so i cant map through it to get an image to
            show for every img_url, so is there another way for me to do this? */}
          </div>
        ))}
      </div>
      <Link to={"/"}>
        <button>Add an entry!</button>
      </Link>

      {/* <Outlet /> */}
    </div>
  );
}
