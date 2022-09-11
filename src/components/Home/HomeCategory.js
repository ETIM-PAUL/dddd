import React from "react";
import { recentPlayed } from "../../adapters/getData";
import CardComponent from "../Search/cardComponent";

const HomeCategory = ({ ...props }) => {
  return (
    <>
      {props.items && (
        <div className="my-4">
          <div className="grid">
            <span className="text-[#fff] font-bold text-[25px]">
              {props.title}
            </span>
            {props.type && (
              <span className="text-[gray] font-sans font-normal text-[13px]">
                Only visible to you
              </span>
            )}
          </div>
          <div
            className="py-2 grid  auto-rows-[0] relative bg-transparent rounded-lg overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(auto-fill,minmax(180px, 1fr))`,
              gridTemplateRows: "100%",
              columnGap: 20,
            }}
          >
            {props.items &&
              props.title !== "Recently played" &&
              props.items.map((item) => {
                return (
                  <CardComponent
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    image={item.images}
                    uri={item.uri}
                  />
                );
              })}
            {props.items &&
              props.title === "Recently played" &&
              props?.items.map((item, id) => {
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
