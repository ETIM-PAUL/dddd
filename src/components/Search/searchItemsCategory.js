import React from "react";
import CardComponent from "./cardComponent";
import { mostPopularItems } from "../../utils/utilFunctions";
import { useSpotify } from "../../context/SpotifyContext";
const SearchItemCategory = ({ title }) => {
  const { state } = useSpotify();

  const { searchResult } = state;
  return (
    <div>
      <section className="my-4">
        {mostPopularItems(searchResult[title]).length > 0 && (
          <p className="font-bold text-[25px] capitalize">{title}</p>
        )}
        <div
          className="py-2 grid  auto-rows-[0] relative bg-transparent rounded-lg overflow-hidden columns-3xs"
          style={{
            gridTemplateColumns: `repeat(auto-fill,minmax(180px, 1fr))`,
            gridTemplateRows: "100%",
            columnGap: 20,
            columns: "",
          }}
        >
          {mostPopularItems(searchResult[title]).map(
            ({ id, name, images, type, uri }) => {
              return (
                <CardComponent
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                  image={images}
                  uri={uri}
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
