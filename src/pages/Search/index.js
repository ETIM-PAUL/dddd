import React, { useEffect, useRef } from "react";
import { fetchCategories } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";

const SearchBody = () => {
  const { state, dispatch } = useSpotify();
  const { token, categories } = state;
  const categoryRef = useRef();

  useEffect(() => {
    fetchCategories(token).then((response) => {
      dispatch({ type: "setCategories", payload: response });
      const colors = [
        "#dc148c",
        "#477d95",
        "#8c67ab",
        "#158a07",
        "#f037a5",
        "#777777",
        "#af2896",
        "#503750",
        "#1d3264",
        "#ba5d07",
        "#9defe1",
        "#dc148c",
        "#d6f27d",
        "#1d3264",
        "#e8125b",
        "#2c46b9",
        "#5f8107",
        "#477d95",
        "#a56752",
        "#8c67ab",
        "#af2896",
        "#158a07",
        "#8c67ab",
        "#1d3264",
        "#e61e32",
        "#1d3264",
        "#0c73ec",
        "#8c1932",
        "#477d95",
        "#e13306",
        "#e1128b",
        "#8c67ab",
        "#477d95",
        "#ffc864",
        "#dc148c",
        "#477d95",
        "#8c67ab",
        "#158a07",
        "#f037a5",
        "#777777",
      ];

      const category = categoryRef.current;
      console.log(categoryRef);
      for (let index = 0; index < colors.length; index++) {
        category.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
      }
    });
  }, [dispatch, token]);

  return (
    <div className="pt-8 h-screen px-8">
      <div className="text-[#fff] flex justify-between font-sans items-center">
        <p className="font-semibold text-[25px]">Recent searches</p>
        <p className="text-[12px] font-semibold text-[#b3b3b3]">SEE ALL</p>
      </div>
      <div className="text-[#fff] block font-sans items-center">
        <p className="font-semibold text-[25px]">Browse all</p>

        <div className="category_box pb-16 pt-4">
          {categories.map(({ id, name, icons }) => {
            return (
              <div
                key={id}
                className="rounded-[10px] bg-[blue] overflow-hidden grid gap-8"
                ref={categoryRef}
              >
                <div className="pt-1 h-[60px] flex">
                  <span className=" font-sans text-[25px] font-bold category__title">
                    {name}
                  </span>
                </div>
                <div className=" flex justify-end justify-items-end">
                  <img
                    src={icons[0].url}
                    alt="category"
                    width={100}
                    height={40}
                    className="rounded-lg transform "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBody;
