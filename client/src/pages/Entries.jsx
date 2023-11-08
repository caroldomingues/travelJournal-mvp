import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

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
    <div>
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
            {/* i want to be able to display
            as many images as the person submits, but how do i do that? cause
            the entry is an object so i cant map through it to get an image to
            show for every img_url, so is there another way for me to do this? */}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
