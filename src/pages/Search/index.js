import React, { useEffect, useRef, useState } from "react";
import { fetchCategories } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import loadingGif from "../../assets/22.gif";
import { colors } from "../../utils/globalConstants";

const Category = ({ ...props }) => {
  const categoryRef = useRef();

  useEffect(() => {
    if (categoryRef.current === undefined) {
      return;
    }

    for (let index = 0; index < colors.length; index++) {
      categoryRef.current.style.backgroundColor = colors[props.index];
    }
  }, []);

  return (
    <div
      className="rounded-[10px] bg-[blue] overflow-hidden grid gap-8 category"
      ref={categoryRef}
    >
      <div className="pt-1 h-[60px] flex">
        <span className=" font-sans text-[25px] font-bold category__title">
          {props.name}
        </span>
      </div>
      <div className=" flex justify-end justify-items-end">
        <img
          src={props.icons[0].url}
          alt="category"
          width={100}
          height={40}
          className="rounded-lg transform "
        />
      </div>
    </div>
  );
};

const SearchBody = () => {
  const { state, dispatch } = useSpotify();
  const [loading, setLoading] = useState(true);
  const { token, categories } = state;

  useEffect(() => {
    fetchCategories(token).then((response) => {
      // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
      dispatch({ type: "setCategories", payload: response });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [dispatch, token, categories]);

  return (
    <>
      {loading ? (
        <img src={loadingGif} className="mx-auto mt-48" alt="loading-gif" />
      ) : (
        <div className="pt-8 h-screen px-8">
          <div className="text-[#fff] flex justify-between font-sans items-center">
            <p className="font-semibold text-[25px]">Recent searches</p>
            <p className="text-[12px] font-semibold text-[#b3b3b3]">SEE ALL</p>
          </div>
          <div className="text-[#fff] block font-sans items-center">
            <p className="font-semibold text-[25px]">Browse all</p>

            <div className="category_box pb-16 pt-4">
              {categories.map(({ id, name, icons }, i) => (
                <Category key={id} name={name} icons={icons} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default SearchBody;
