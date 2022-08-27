import React from "react";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const SpotifyPlayer = () => {
  return (
    <div className="h-[100%]">
      <div className="flex h-[90vh]">
        <SideBar />
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default SpotifyPlayer;
