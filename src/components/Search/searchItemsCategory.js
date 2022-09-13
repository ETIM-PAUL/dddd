import React from "react";
import CardComponent from "./cardComponent";
import { mostPopularItems } from "../../utils/utilFunctions";
import { useSpotify } from "../../context/SpotifyContext";
import TracksResult from "./tracksResult";
const SearchItemCategory = ({ ...props }) => {
  const { state } = useSpotify();
  // console.log(props.title);
  const { searchResult } = state;
  return (
    <div>
      {props.title === "songs" ? (
        <TracksResult tableHeading={props.tableHeading} title="tracks" />
      ) : (
        <section className="my-4">
          {mostPopularItems(searchResult[props.title]).length > 0 && (
            <p className="font-bold text-[25px] capitalize">{props.title}</p>
          )}
          <div
            className={
              props.filter !== "all"
                ? "category_box gap-6"
                : "py-2 grid  grid-rows-full auto-rows-[0] relative bg-transparent rounded-lg overflow-hidden columns-3xs"
            }
            style={{
              gridTemplateColumns: `repeat(auto-fill,minmax(180px, 1fr))`,
              columnGap: 20,
              columns: "",
            }}
          >
            {mostPopularItems(searchResult[props.title]).map(
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
      )}
    </div>
  );
};

export default SearchItemCategory;
