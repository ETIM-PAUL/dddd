import React from "react";
const SideBarComponent = ({ ...props }) => {
  return (
    <div className="flex gap-3 text-[gray] hover:text-[#fff] hover:cursor-default py-2 content-center self-center">
      <span className="text-[27px]">{props.icon}</span>
      <span className="font-black flex items-center text-[14px]">
        {props.title}
      </span>
    </div>
  );
};

export default SideBarComponent;
