import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";

const Header = ({ headerBg }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const bgColor =
    " bg-[#2c2b2a] h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const noBgColor =
    "h-[50px] w-[100%] z-30 sticky top-0  py-9 px-8 flex items-center justify-between";
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <>
      <div className={headerBg ? bgColor : noBgColor}>
        <div className=" flex w-[100%] justify-between items-center">
          <div className="flex gap-4">
            <div className="rounded-[50%] bg-[#000] w-[40px] h-[40px] flex items-center justify-center">
              <MdKeyboardArrowLeft className="text-[30px] text-[#fff] " />
            </div>
            <div className="rounded-[50%] bg-[#000] w-[40px] h-[40px] flex items-center justify-center">
              <MdKeyboardArrowRight className="text-[30px] text-[#fff] " />
            </div>
          </div>
          <div
            className="h-8 bg-[black] hover:bg-[#2f2f31] hover:cursor-pointer w-fit rounded-[25px] flex gap-1 items-center "
            onClick={() => toggleDropDown()}
          >
            <div className="rounded-[50%] bg-[#333] w-[30px] h-[30px] flex items-center justify-center ml-[2px] my-[1px]">
              <FiUser className="text-[#fff] text-[18px]" />
            </div>
            <span className="text-[#fff] text-[13px] font-bold font-sans ml-[2px]">
              Paul Etim
            </span>
            <span className="text-[#fff] text-[30px] mr-[2px] ">
              {!showDropDown ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
