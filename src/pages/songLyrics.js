import React, { useEffect, useRef, useState } from "react";
import {
  fetchMusixMatchTrack,
  fetchMusixMatchTrackLyrics,
} from "../adapters/getData";
import { colors } from "../utils/globalConstants";
import { useSpotify } from "../context/SpotifyContext";

const SongLyrics = () => {
  const lyricsBody = useRef();
  const { state } = useSpotify();
  const [lyrics, setLyrics] = useState("");
  const { currentlyPlayingTrack } = state;
  useEffect(() => {
    if (lyricsBody.current === undefined) {
      return;
    }
    if (currentlyPlayingTrack !== undefined || currentlyPlayingTrack !== null) {
      fetchMusixMatchTrack(
        currentlyPlayingTrack?.artistes[0],
        currentlyPlayingTrack?.name
      ).then((response) => {
        if (response === "") {
          setLyrics(
            "Sorry, This app isn't fully synched with your current playing device. Please refresh this page. If problem persist. You probably have a slow network"
          );
        }
        fetchMusixMatchTrackLyrics(
          response.track_id,
          response.commontrack_id
        ).then((response) => {
          if (response) {
            for (let index = 0; index < colors.length; index++) {
              lyricsBody.current.style.backgroundColor =
                colors[Math.floor(response.id % 10)];
            }
            setLyrics(response.lyrics);
          } else setLyrics("Sorry, You will have to guess this one's lyrics");
        });
      });
    } else
      setLyrics(
        "Sorry, This app isn't fully synched with your current playing device. Please refresh this page. If problem persist. You probably have a slow network"
      );
  }, [
    currentlyPlayingTrack,
    currentlyPlayingTrack?.artistes,
    currentlyPlayingTrack?.name,
    lyrics,
  ]);

  return (
    <div className="h-[100%] font-sans px-8 overflow-y-scroll" ref={lyricsBody}>
      {lyrics.length > 0 && (
        <>
          <div className="pt-6 px-16 text-[30px] text-white font-bold whitespace-pre-wrap">
            {lyrics}
          </div>
          <div className="pt-8 px-16 pb-7 text-[12px] text-white font-normal">
            Lyrics provided by MusixMatch (The lyrics is not complete, as
            MusixMatch only provides 30% of the lyrics for unpaid plan){" "}
          </div>
        </>
      )}
    </div>
  );
};

export default SongLyrics;
