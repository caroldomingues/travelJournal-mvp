import React from "react";

export default function HomePage() {
  return (
    <div>
      <h2>Add a new entry!</h2>
      <form>
        <label>Where are you?</label>
        <input />
        <label>What did you do?</label>
        <input />
        <label>What is the date?</label>
        <input type="date" />
        <label>Share a picture?</label>
        <input />
      </form>
    </div>
  );
}
