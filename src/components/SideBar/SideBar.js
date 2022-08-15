import React from "react";
import SideBarComponent from "./SideBarComponents";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { VscLibrary } from "react-icons/vsc";
import { BsPlusSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";

const SideBar = () => {
  return (
    <>
      <div className="bg-[#000] h-[91vh] w-60 z-30 block px-6">
        <img
          src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
          alt="spotify-logo"
          className="ml-[-15px]"
        />
        <div className="m-auto">
          <SideBarComponent icon={<MdHomeFilled />} title="Home" />
          <SideBarComponent icon={<FiSearch />} title="Search" />
          <SideBarComponent icon={<VscLibrary />} title="Your Library" />
          <br />
          <SideBarComponent icon={<BsPlusSquare />} title="Create Playlist" />
          <SideBarComponent icon={<BsHeart />} title="Liked Songs" />
        </div>
        <hr className="mt-2 bg-[#000]" />
      </div>
    </>
  );
};

export default SideBar;
