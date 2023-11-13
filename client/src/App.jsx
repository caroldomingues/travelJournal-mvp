import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cities from "./pages/Cities";
import City from "./pages/City";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:id" element={<City />} />
      </Routes>
    </>
  );
}

export default App;
