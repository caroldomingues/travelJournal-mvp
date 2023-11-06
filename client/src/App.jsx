import { useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState([]);

  return (
    <>
      <form>
        <label>When is your trip taking place?</label>
        <input type="date" />
        until
        <input type="date" />
        <label value={location}>Where are you going?</label>
        <input />
        <button>Send!</button>
      </form>
    </>
  );
}

export default App;
