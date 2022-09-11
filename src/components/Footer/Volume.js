import React, { useState, useEffect } from "react";
import { changeVolume } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import { TbMicrophone2 } from "react-icons/tb";
import { BiDevices } from "react-icons/bi";

import { BsVolumeDown, BsVolumeMute, BsStack } from "react-icons/bs";
import { fetchPlayerState } from "../../adapters/getData";
import { NavLink } from "react-router-dom";
const Volume = () => {
  const [mute, setMute] = useState(false);
  const [volumeVal, setVolumeVal] = useState("");

  const { state, dispatch } = useSpotify();
  const { token, playerVolume } = state;

  useEffect(() => {
    fetchPlayerState(token).then((res) => {
      setVolumeVal(res.volume);
    });
  }, [token]);

  const toggleVolume = (type) => {
    setMute(!mute);
    if (type === "mute") {
      changeVolume(token, 0);
      fetchPlayerState().then((res) => {
        setVolumeVal(res.volume);
      });
      dispatch({ type: "setPlayerVolume", payload: 0 });
    } else {
      changeVolume(token, volumeVal);
      fetchPlayerState().then((res) => {
        setVolumeVal(res.volume);
      });
      dispatch({ type: "setPlayerVolume", payload: volumeVal });
    }
  };
  const setVolumeValue = (value) => {
    changeVolume(token, value);
    if (value === "0") {
      setMute(true);
    } else setMute(false);
    setVolumeVal(value);
    dispatch({ type: "setPlayerVolume", payload: value });
  };

  return (
    <div className="flex gap-3 flex-1 justify-end">
      <NavLink
        to={`/lyrics`}
        style={({ isActive }) => ({ color: isActive ? "#1ad760" : "gray" })}
      >
        <TbMicrophone2
          className="text-[20px] hover:text-[#fff] self-center"
          title="Lyrics"
        />
      </NavLink>
      <BsStack
        className="text-[20px] text-[gray] hover:text-[#fff] self-center"
        title="Queue"
      />
      <BiDevices
        className="text-[20px] text-[gray] hover:text-[#fff] self-center"
        title="Devices"
      />
      <div className="flex gap-1">
        {!mute ? (
          <BsVolumeDown
            className="text-[25px] text-[gray] hover:text-[#fff] self-center"
            onClick={() => toggleVolume("mute")}
            title="Unmute"
          />
        ) : (
          <BsVolumeMute
            className="text-[25px] text-[gray] hover:text-[#fff]"
            onClick={() => toggleVolume("unmute")}
            title="Mute"
          />
        )}
        <div className="flex items-center ">
          <input
            type="range"
            className="volumeRange"
            min={0}
            max={100}
            value={playerVolume}
            onChange={(e) => setVolumeValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
