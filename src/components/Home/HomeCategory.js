import React from "react";
import { recentPlayed } from "../../adapters/getData";
import CardComponent from "../Search/cardComponent";

const HomeCategory = ({ ...props }) => {
  return (
    <>
      {props.items && (
        <div className="my-4">
          <span className="text-[#fff] font-bold text-[25px]">
            {props.title}
          </span>
          <div
            className="py-2 grid  auto-rows-[0] relative bg-transparent rounded-lg overflow-hidden columns-3xs"
            style={{
              gridTemplateColumns: `repeat(auto-fill,minmax(200px, 1fr))`,
              gridTemplateRows: "100%",
              columnGap: 20,
              columns: "",
            }}
          >
            {props.title !== "Recently played" &&
              props.items.map(({ id, name, images, type, uri }) => {
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
              })}
            {props.items &&
              props.title === "Recently played" &&
              props.items.map((item, id) => {
                return (
                  <CardComponent
                    key={id}
                    id={item.track.id}
                    name={item.track.album.name}
                    type={item.context?.type}
                    track_number={item.track.track_number}
                    image={item.track.album.images}
                    uri={item.track.album.uri}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCategory;
