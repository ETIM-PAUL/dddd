import React from "react";
import CardComponent from "./cardComponent";
import { mostPopularItems } from "../../utils/utilFunctions";
import { useSpotify } from "../../context/SpotifyContext";
const SearchItemCategory = ({ title }) => {
  const { state } = useSpotify();

  const { searchResult } = state;
  console.log("search result", searchResult);
  return (
    <div>
      <section className="my-4">
        <p className="font-bold text-[25px] capitalize">{title}</p>
        <div className="py-2 flex column-auto  gap-4 relative bg-transparent rounded-lg overflow-hidden">
          {mostPopularItems(searchResult[title]).map(
            ({ id, name, images, type }) => {
              return (
                <CardComponent
                  key={id}
                  id={id}
                  name={name}
                  type={title}
                  image={images}
                />
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchItemCategory;
