import React from "react";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const SpotifyPlayer = () => {
  return (
    <div>
      <div className="flex w-[100%]">
        <SideBar />
        <div className="block">
          <Body />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpotifyPlayer;
