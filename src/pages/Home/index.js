import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const len = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 454, 334, 2334, 433, 45532, 45, 2, 12, 3, 4,
    5, 6, 7, 8, 76, 5, 3, 2, 4, 5, 4, 43, 2, 2, 2, 3, 5, 6, 7, 8, 75, 3, 2, 5,
    67, 5, 7, 6, 4, 3, 5,
  ];
  return (
    <div className=" pt-20 px-8">
      <div className="text-[#fff]">
        {len.map((l, key) => {
          return <h1 key={key}>Home</h1>;
        })}
      </div>
    </div>
  );
};

export default HomePage;
