import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Entries from "./pages/Entries";
import Entry from "./pages/Entry";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/entries/:id" element={<Entry />} />
      </Routes>
    </>
  );
}

export default App;
