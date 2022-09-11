import React, { useEffect, useState } from "react";
import { userTopItems } from "../adapters/getData";
import Header from "../components/HeaderNav/Header";
import { useSpotify } from "../context/SpotifyContext";
import defaultImage from "../assets/defaultImg.jpeg";
import HomeCategory from "../components/Home/HomeCategory";
import {
  durationToMinsAndSecs,
  mostPopularItems,
} from "../utils/utilFunctions";
import TrackInfo from "../components/Playlist/TrackInfo";

const UserProfile = ({ headerBg }) => {
  const { state } = useSpotify();
  const { user, playlists, token } = state;
  const [userItems, setUserItems] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  useEffect(() => {
    userTopItems(token, "tracks").then((response) =>
      setUserTopTracks(response)
    );
    userTopItems(token, "artists").then((response) => setUserItems(response));
  }, [token]);

  return (
    <div>
      <Header headerBg={headerBg} type="profile" />
      <div className="py-6 px-8">
        <div className="flex gap-8 ">
          <img
            src={user.image?.url ? user.image?.url : defaultImage}
            alt="playlist"
            width={230}
            height={200}
            className="object-contain rounded-[50%]"
          />

          <div className="pt-6 inline-grid items-end">
            <p className="uppercase text-white font-bold text-[12px] font-sans">
              PROFILE
            </p>
            <h1 className="text-[75px] text-[#fff] leading-[1em] my-1 font-bold tracking-[-4px] font-sans">
              {user.name}
            </h1>
            <p className="text-white">{playlists.length} Public Playlists</p>
          </div>
        </div>
        <div className="my-12 font-sans font-bold">
          <HomeCategory
            items={userItems}
            title="Top artists this month"
            type="profile"
          />
        </div>
        <div className="my-12 font-sans font-bold">
          <div className="grid">
            <span className="text-white font-sans font-bold text-[25px]">
              Top tracks this month
            </span>
            <span className="text-[gray] font-sans font-normal text-[13px]">
              Only visible to you
            </span>
          </div>
          {mostPopularItems(userTopTracks)
            .slice(0, 4)
            .map(({ id, name, artists, album, duration_ms }) => {
              return (
                <div
                  className="flex justify-between px-[0.7rem] items-center hover:bg-[#2b2b2b] hover:rounded-md mt-2"
                  key={id}
                >
                  <TrackInfo
                    id={id}
                    name={name}
                    artist={artists}
                    album={album?.name}
                    image={album?.images[2]}
                    type="profile"
                  />
                  <span className="text-[#b3b3b3] py-1 self-center justify-start flex font-normal">
                    {album?.name}
                  </span>
                  <span className="text-[#b3b3b3] py-1 self-center font-normal">
                    {durationToMinsAndSecs(duration_ms)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
