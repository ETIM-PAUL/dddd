import React, { useEffect, useMemo, useState } from "react";
import {
  featuredPlaylists,
  fetchCategoryItem,
  newReleases,
  recentPlayed,
  userTopItems,
} from "../../adapters/getData";
import Header from "../../components/HeaderNav/Header";
import HomeCategory from "../../components/Home/HomeCategory";
import { useSpotify } from "../../context/SpotifyContext";

const HomePage = ({ headerBg }) => {
  const { state } = useSpotify();
  const { token } = state;
  const [featured, setFeatured] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [pop, setPop] = useState([]);
  const [afro, setAfro] = useState([]);
  const [hipHop, setHipHop] = useState([]);
  const [randb, setRandB] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const curHr = new Date().getHours();

  useMemo(() => {
    if (curHr < 12) {
      setGreeting("Good morning");
    } else if (curHr < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [curHr]);
  useEffect(() => {
    featuredPlaylists(token).then((response) => setFeatured(response));
    userTopItems(token, "artists").then((response) => setUserItems(response));
    newReleases(token).then((response) => setNewAlbums(response));
    recentPlayed(token).then((response) => {
      setRecentlyPlayed(response);
    });
    fetchCategoryItem(token, "0JQ5DAqbMKFEC4WFtoNRpw").then((response) => {
      setPop(response);
    });
    fetchCategoryItem(token, "0JQ5DAqbMKFNQ0fGp4byGU").then((response) => {
      setAfro(response);
    });
    fetchCategoryItem(token, "hiphop").then((response) => {
      setHipHop(response);
    });
    fetchCategoryItem(token, "0JQ5DAqbMKFEZPnFQSFB1T").then((response) => {
      setRandB(response);
    });
  }, [token]);

  return (
    <>
      <Header headerBg={headerBg} type="playlist" />

      <div className=" pt-4 px-8 font-sans">
        <span className="text-[#fff] font-bold text-[30px]">{greeting}</span>

        <HomeCategory title="Afro" items={afro} />
        <HomeCategory title="Recently played" items={recentlyPlayed} />
        <HomeCategory title="Pop" items={pop.slice(8)} />
        <HomeCategory items={featured} title="Editor's picks" />
        <HomeCategory title="Hip Hop" items={hipHop} />
        {userItems && (
          <HomeCategory items={userItems.slice(7)} title="Popular artists" />
        )}
        <HomeCategory items={randb.slice(7)} title="Discover something new" />
        <HomeCategory title="Afro Party vibes only" items={afro.slice(11)} />
        <HomeCategory items={userItems} title="Your favourite artists" />
        <HomeCategory items={newAlbums} title="New releases" />
        <HomeCategory items={randb} title="R&B around the globe" />
        <img
          src="http://tracking.musixmatch.com/t1.0/2fVHrSxsQbJUuj9MW9zG1e"
          alt=""
        />
      </div>
    </>
  );
};

export default HomePage;
