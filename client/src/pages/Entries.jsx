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
            <h3>{`${e.destination}`}</h3>
            <img width={600} src={e.img_url} />
          </div>
        ))}
      </div>
    </div>
  );
}
