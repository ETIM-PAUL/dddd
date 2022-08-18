import React, { useEffect } from "react";
import Playlist from "../../pages/Playlist";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
const Body = () => {
  return (
    <div className="bg-blend h-[91vh]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </div>
  );
};

export default Body;
