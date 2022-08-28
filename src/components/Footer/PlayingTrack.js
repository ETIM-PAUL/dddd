import React, { useEffect, useState } from "react";
import { useSpotify } from "../../context/SpotifyContext";

const PlayingTrack = () => {
  const { state } = useSpotify();
  const { currentlyPlayingTrack } = state;
  const [playingTrack, setPlayingTrack] = useState({});
  useEffect(() => {
    if (Object.values(currentlyPlayingTrack).length > 0) {
      setPlayingTrack(currentlyPlayingTrack);
    }
  }, [currentlyPlayingTrack]);

  const { name, artistes, duration, image } = playingTrack;

  return (
    <>
      {currentlyPlayingTrack && (
        <div className="flex gap-4 items-center w-50">
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
      )}
    </>
  );
};

export default PlayingTrack;
