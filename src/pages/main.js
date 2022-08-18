import React from "react";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import Header from "../components/HeaderNav/Header";
import SideBar from "../components/SideBar/SideBar";

const SpotifyPlayer = () => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="block w-[100%]">
          {/* <Header /> */}

          <Body />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpotifyPlayer;
