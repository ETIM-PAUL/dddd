import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

const CardComponent = ({ ...props }) => {
  const roundedImages = "rounded-[50%] w-40 h-40 bg-contain";
  const squareImages = " w-40 h-40 bg-contain";
  return (
    <div className="group block hover:bg-[#222222] hover:cursor-pointer rounded-[10px] bg-[#181818]">
      <div className="block px-4">
        <div className="mt-4 mb-3">
          <div
            className={props.type === "artists" ? roundedImages : squareImages}
            style={{
              backgroundImage: `url(${props.image[0]?.url})`,
            }}
          >
            <BsFillPlayCircleFill className="text-[#1ad760] text-[55px] hover:p-[1px] absolute bottom-28 ml-[6rem] group-hover:block hidden  hover:animate-bounce" />
          </div>
        </div>

        <div className="mb-8 font-sans font-bold grid gap-2">
          <p className="text-white truncate">{props.name}</p>
          <p className="text-[gray] text-[13px] capitalize font-medium font-sans">
            {props.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
