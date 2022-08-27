import React, { useEffect, useRef, useState } from "react";
import Playlist from "../../pages/Playlist";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
import Header from "../HeaderNav/Header";
const Body = () => {
  const contentRef = useRef();
  const [mainHeaderBg, setMainHeaderBG] = useState(false);

  return (
    <div className="bg-blend h-[89vh]">
      <div className="h-[89vh] overflow-scroll">
        <div className="bg-[#2b2b2b]">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Routes>
        </div>
        {/* <div className="mb-12"></div> */}
      </div>
    </div>
  );
};

export default Body;
