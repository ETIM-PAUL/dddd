import React from "react";
const SideBarComponent = ({ ...props }) => {
  return (
    <div className="flex gap-3 text-[gray] hover:text-[#fff] hover:cursor-default py-2 content-center self-center">
      <span className="text-[25px]">{props.icon}</span>
      <span className="font-bold flex items-center text-[13px] font-sans">
        {props.title}
      </span>
    </div>
  );
};

export default SideBarComponent;
