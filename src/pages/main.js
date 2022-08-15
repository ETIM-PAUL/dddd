import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/HeaderNav/Header";
import SideBar from "../components/SideBar/SideBar";

const SpotifyPlayer = () => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <Header />
      </div>
      <Footer />
    </div>
  );
};

export default SpotifyPlayer;
