import React, { useRef, useState } from "react";
import Playlist from "../../pages/Playlist";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
import Header from "../HeaderNav/Header";
import SearchBody from "../../pages/Search";
const Body = () => {
  const contentRef = useRef();
  const [headerBg, setHeaderBG] = useState(false);
  const [tableHeading, setTableHeading] = useState(false);
  const contentScroll = () => {
    let scrollTopValue = contentRef.current.scrollTop;
    scrollTopValue >= 247 ? setHeaderBG(true) : setHeaderBG(false);
    scrollTopValue >= 380 ? setTableHeading(true) : setTableHeading(false);
  };

  return (
    <div
      className=" h-[90vh] w-[100%] block overflow-y-scroll bg-blend  "
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
        <Route path="/search" element={<SearchBody />} />
      </Routes>
    </div>
  );
};

export default Body;
