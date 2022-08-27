import React, { useEffect, useRef, useState } from "react";
import Playlist from "../../pages/Playlist";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
import Header from "../HeaderNav/Header";
const Body = () => {
  const contentRef = useRef();
  const [headerBg, setHeaderBG] = useState(false);
  const [tableHeading, setTableHeading] = useState(false);
  const contentScroll = () => {
    let scrollTopValue = contentRef.current.scrollTop;
    // console.log(scrollTopValue);
    scrollTopValue >= 247 ? setHeaderBG(true) : setHeaderBG(false);
    scrollTopValue >= 380 ? setTableHeading(true) : setTableHeading(false);
  };

  return (
    <div
      className=" h-[90vh] w-[100%] block overflow-scroll bg-blend  "
      ref={contentRef}
      onScroll={contentScroll}
    >
      <Header headerBg={headerBg} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/playlist/:id"
          element={<Playlist tableHeading={tableHeading} />}
        />
      </Routes>
      {/* <div className="mb-12"></div> */}
    </div>
  );
};

export default Body;
