import React, { useEffect } from "react";
import { fetchUser } from "../adapters/getData";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";
import { useSpotify } from "../context/SpotifyContext";

const SpotifyPlayer = () => {
  const { state, dispatch } = useSpotify();
  useEffect(() => {
    console.log(state.token);
    fetchUser(state.token).then((response) => {
      dispatch({ type: "setUser", payload: response });
    });
  }, [state.token, dispatch]);

  return (
    <div className="h-[100%]">
      <div className="flex h-[90vh]">
        <SideBar />
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default SpotifyPlayer;
