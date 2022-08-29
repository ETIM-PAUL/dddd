import React, { useEffect, useState } from "react";
import { useSpotify } from "../../context/SpotifyContext";

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
  const spaceArtistes = () => {
    if (artistes?.length > 0) {
      return artistes.join(", ");
    } else return artistes;
  };

  return (
    <div className="flex gap-4 items-center flex-1">
      {currentlyPlayingTrack && (
        <>
          <img alt="" src={image} />
          <div className="grid">
            <p className="text-[14px] text-[#fff] hover:underline hover:cursor-pointer ">
              {name}
            </p>
            <div className="flex gap-1">
              <p className="text-[#b3b3b3] text-[11px] hover:underline hover:cursor-pointer">
                {spaceArtistes()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayingTrack;
