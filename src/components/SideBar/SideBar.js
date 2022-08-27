import React from "react";
import SideBarComponent from "./SideBarComponents";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { VscLibrary } from "react-icons/vsc";
import { BsPlusSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import Playlists from "./SidePlaylist";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-[#000]  w-60 min-w-60 z-30 block px-6">
      <img
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="spotify-logo"
        className="ml-[-15px]"
      />
      <div className="m-auto">
        <Link to="/">
          <SideBarComponent icon={<MdHomeFilled />} title="Home" />
        </Link>
        <SideBarComponent icon={<FiSearch />} title="Search" />
        <SideBarComponent icon={<VscLibrary />} title="Your Library" />
        <div className="my-4" />
        <SideBarComponent icon={<BsPlusSquare />} title="Create Playlist" />
        <SideBarComponent icon={<BsHeart />} title="Liked Songs" />
      </div>
      <div className="mt-2 bg-[gray] h-[0.5px]" />

      <Playlists />
    </div>
  );
};

export default SideBar;
