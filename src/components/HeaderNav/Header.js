import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { useSpotify } from "../../context/SpotifyContext";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import { searchQuery } from "../../adapters/getData";

const Header = ({ headerBg, type }) => {
  const { state, dispatch } = useSpotify();
  const [searchInput, setSearchInput] = useState("");

  const { token } = state;

  const [showDropDown, setShowDropDown] = useState(false);
  const bgColor =
    " bg-[#2c2b2a] h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const noBgColor =
    "h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSearch = (value) => {
    searchQuery(token, value);
    setSearchInput(value);
    dispatch({ type: "setSearchValue", payload: value });
  };

  return (
    <>
      <div className={headerBg ? bgColor : noBgColor}>
        <div className=" flex w-[100%] justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="rounded-[50%] bg-black w-[36px] h-[36px] flex items-center justify-center">
              <MdKeyboardArrowLeft className="text-[30px] text-[#fff] " />
            </div>
            <div className="rounded-[50%] bg-black w-[35px] h-[35px] flex items-center justify-center">
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
          </div>
          <div
            className="h-8 bg-[black] hover:bg-[#2f2f31] hover:cursor-pointer w-fit rounded-[25px] flex gap-1 items-center text-white"
            onClick={() => toggleDropDown()}
          >
            <div className="rounded-[50%] bg-[#333] w-[30px] h-[30px] flex items-center justify-center ml-[2px] my-[1px]">
              <FiUser className=" text-[18px]" />
            </div>
            <span className=" text-[13px] font-bold font-sans ml-[2px]">
              Paul Etim
            </span>
            <span className=" text-[30px] mr-[2px] ">
              {!showDropDown ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
