import React, { useEffect, useState } from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { spaceArtistes } from "../../utils/utilFunctions";

const PlayingTrack = () => {
  const { state } = useSpotify();
  const { currentlyPlayingTrack } = state;
  const [playingTrack, setPlayingTrack] = useState({});
  useEffect(() => {
    if (currentlyPlayingTrack) {
      setPlayingTrack(currentlyPlayingTrack);
    }
  }, [currentlyPlayingTrack]);

  const { name, artistes, duration, image } = playingTrack;

  return (
    <div className="flex gap-4 items-center flex-1">
      {currentlyPlayingTrack && (
        <>
          <img alt="" src={image} className="w-14 h-14 bg-contain" />
          <div className="grid">
            <p className="text-[14px] text-[#fff] hover:underline hover:cursor-pointer ">
              {name}
            </p>
            <div className="flex gap-1">
              <p className="text-[#b3b3b3] text-[11px] hover:underline hover:cursor-pointer">
                {spaceArtistes(artistes)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayingTrack;
