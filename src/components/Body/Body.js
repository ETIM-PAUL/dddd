import React, { useRef, useState } from "react";
import PlaylistDetails from "../../pages/Playlist";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/Home";
import SearchBody from "../../pages/Search";
const Body = () => {
  const contentRef = useRef();
  const [headerBg, setHeaderBG] = useState(false);
  const [secondheaderBg, setSecondHeaderBG] = useState(false);
  const [tableHeading, setTableHeading] = useState(false);
  const contentScroll = () => {
    let scrollTopValue = contentRef.current.scrollTop;
    scrollTopValue >= 247 ? setHeaderBG(true) : setHeaderBG(false);
    scrollTopValue >= 107 ? setSecondHeaderBG(true) : setSecondHeaderBG(false);
    scrollTopValue >= 380 ? setTableHeading(true) : setTableHeading(false);
  };

  return (
    <div
      className=" h-[90vh] w-[100%] block overflow-y-scroll bg-blend  "
      ref={contentRef}
      onScroll={contentScroll}
    >
      <Routes>
        <Route path="/" element={<HomePage headerBg={secondheaderBg} />} />
        <Route
          path="/playlist/:id"
          element={
            <PlaylistDetails tableHeading={tableHeading} headerBg={headerBg} />
          }
        />
        <Route path="/search" element={<SearchBody headerBg={headerBg} />} />
      </Routes>
    </div>
  );
};

export default Body;
