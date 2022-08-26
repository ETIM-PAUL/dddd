import React from "react";
import { useSpotify } from "../../context/SpotifyContext";

const PlayingTrack = () => {
  const { state } = useSpotify();
  const { currentlyPlayingTrack } = state;
  const { name, artistes, duration, image } = currentlyPlayingTrack;

  return (
    <div className="flex gap-4 items-center">
      <img alt="" src={image} />
      <div className="grid">
        <p className="text-[#fff] hover:underline hover:cursor-pointer ">
          {name}
        </p>
        <div className="flex gap-1">
          {artistes?.map((artiste, id) => {
            return (
              <p
                className="text-[#b3b3b3] text-xs hover:underline hover:cursor-pointer"
                key={id}
              >
                {artiste}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayingTrack;
