import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import loadingGif from "../../assets/22.gif";
import Category from "../../components/Search/category";

const SearchBody = () => {
  const { state, dispatch } = useSpotify();
  const [loading, setLoading] = useState(true);
  const { token, categories } = state;

  useEffect(() => {
    fetchCategories(token).then((response) => {
      dispatch({ type: "setCategories", payload: response });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [dispatch, token]);

  return (
    <>
      {loading ? (
        <img src={loadingGif} className="mx-auto mt-48" alt="loading-gif" />
      ) : (
        <div className="pt-8 h-screen px-8">
          {/* <div className="text-[#fff] flex justify-between font-sans items-center">
            <p className="font-semibold text-[25px]">Recent searches</p>
            <p className="text-[12px] font-semibold text-[#b3b3b3]">SEE ALL</p>
          </div> */}
          <div className="text-[#fff] block font-sans items-center">
            <p className="font-semibold text-[25px]">Your top genres</p>

            <div className="flex pb-16 pt-4 justify-between gap-[1.7rem]">
              {categories.slice(0, 4).map(({ id, name, icons }, i) => (
                <Category
                  key={id}
                  name={name}
                  icons={icons}
                  index={i}
                  iconWidth={120}
                />
              ))}
            </div>
          </div>
          <div className="text-[#fff] block font-sans items-center">
            <p className="font-semibold text-[25px]">Browse all</p>

            <div className="category_box pb-16 pt-4">
              {categories.slice(4).map(({ id, name, icons }, i) => (
                <Category
                  key={id}
                  name={name}
                  icons={icons}
                  index={i}
                  iconWidth={100}
                />
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
