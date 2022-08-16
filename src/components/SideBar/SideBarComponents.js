import React from "react";
const SideBarComponent = ({ ...props }) => {
  return (
    <div className="flex gap-3 text-[gray] hover:text-[#fff] hover:cursor-default py-2">
      <span className="text-[30px]">{props.icon}</span>
      <span className="font-black mt-[5px] text-[14px]">{props.title}</span>
    </div>
  );
};

export default SideBarComponent;
