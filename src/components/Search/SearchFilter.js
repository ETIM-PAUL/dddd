import React from "react";

const SearchFilter = ({ title, filter, setFilter, setFiltering }) => {
  const filtering = () => {
    setFilter(title);
    console.log(title);
    if (title !== "all") {
      setFiltering(true);
    } else setFiltering(false);
  };
  const currentFilterValue =
    "text-black bg-white  py-2 px-3 rounded-[20px] capitalize cursor-default";
  const filterValue =
    "text-white bg-[#191919] hover:bg-[#212121] py-2 px-3 rounded-[20px] capitalize cursor-default";
  return (
    <div className=" border-none font-sans font-normal block text-[14px] ">
      <span
        className={filter === title ? currentFilterValue : filterValue}
        onClick={() => filtering()}
      >
        {title}
      </span>
    </div>
  );
};

export default SearchFilter;
