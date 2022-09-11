import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useSpotify } from "../../context/SpotifyContext";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";

const Header = ({ headerBg, type }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useSpotify();
  const { selectedCategory, selectedPlaylistData, user } = state;
  const [searchInput, setSearchInput] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const bgColor =
    " bg-[#2c2b2a] h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const noBgColor =
    "h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSearch = (value) => {
    setSearchInput(value);
    dispatch({ type: "setSearchValue", payload: value });
  };
  // useEffect(() => {
  //   document.addEventListener("mouseup", function (e) {
  //     var container = document.getElementById("container");
  //     if (!container.contains(e.target)) {
  //       setShowDropDown(false);
  //     }
  //   });
  // }, []);

  return (
    <>
      <div className={headerBg ? bgColor : noBgColor}>
        <div className=" flex w-[100%] justify-between items-center">
          <div className="flex gap-4 items-center">
            <div
              className="rounded-[50%] bg-black w-[36px] h-[36px] flex items-center justify-center"
              onClick={() => {
                navigate(-1);
              }}
            >
              <MdKeyboardArrowLeft className="text-[30px] text-[#fff] " />
            </div>
            <div
              className="rounded-[50%] bg-black w-[35px] h-[35px] flex items-center justify-center"
              onClick={() => {
                navigate(1);
              }}
            >
              <MdKeyboardArrowRight className="text-[30px] text-[#fff] " />
            </div>
            {type === "search" && (
              <div className="flex items-center justify-center shrink-1">
                <input
                  className="w-80 rounded-[20px] py-2 px-8 search-input flex items-center"
                  placeholder="What do you want to listen to?"
                  value={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            )}
            {selectedCategory && selectedCategory.name !== null && headerBg ? (
              <div className="flex items-center justify-center shrink-1 text-white font-sans">
                <p className="text-[30px] font-bold">{selectedCategory.name}</p>
              </div>
            ) : null}
            {selectedPlaylistData &&
            selectedPlaylistData.name !== null &&
            headerBg ? (
              <div className="flex items-center justify-center shrink-1 text-white font-sans">
                <p className="text-[30px] font-bold">
                  {selectedPlaylistData.name}
                </p>
              </div>
            ) : null}
          </div>
          <div
            className="h-8 bg-[black] hover:bg-[#2f2f31] hover:cursor-pointer w-fit rounded-[25px] flex gap-1 items-center text-white"
            onClick={() => toggleDropDown()}
          >
            <div className="rounded-[50%] bg-[#333] w-[30px] h-[30px] flex items-center justify-center ml-[2px] my-[1px]">
              <FiUser className=" text-[18px]" />
            </div>
            <span className=" text-[13px] font-bold font-sans ml-[2px]">
              {user && user.name}
            </span>
            <span className=" text-[30px] mr-[2px] ">
              {!showDropDown ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </span>
          </div>
          {showDropDown && (
            <div
              className="w-40 h-24 px-1 absolute top-16 rounded-lg right-8 bg-[#212121] font-sans"
              id="container"
            >
              <div className="grid mt-2">
                <NavLink
                  to="/profile"
                  style={({ isActive }) => ({
                    color: isActive ? "white" : "gray",
                  })}
                  className="w-full hover:bg-[#313131] py-2 px-2"
                >
                  <span className="text-[#eee] text-[14px] font-medium   cursor-default">
                    Profile
                  </span>
                </NavLink>
                <span className="text-[#eee] text-[14px] w-full font-medium py-2 px-2 hover:bg-[#313131] cursor-default">
                  Log out
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
