import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import Category from "../../components/Search/categories";
import Header from "../../components/HeaderNav/Header";

const SearchBody = ({ headerBg }) => {
  const { state, dispatch } = useSpotify();
  const [loading, setLoading] = useState(true);
  const { token, categories, searchValue } = state;

  useEffect(() => {
    fetchCategories(token).then((response) => {
      dispatch({ type: "setCategories", payload: response });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [dispatch, token]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <Header headerBg={headerBg} type="search" />
          {searchValue.length > 0 ? (
            <div></div>
          ) : (
            <div className="pt-8 h-screen px-8">
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
        </>
      )}
      ;
    </>
  );
};

export default SearchBody;
