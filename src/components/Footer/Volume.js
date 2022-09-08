import React, { useState, useEffect } from "react";
import { changeVolume } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import { TbMicrophone2 } from "react-icons/tb";
import { BiDevices } from "react-icons/bi";

import { BsVolumeDown, BsVolumeMute, BsStack } from "react-icons/bs";
const Volume = () => {
  const [mute, setMute] = useState(false);
  const [volumeVal, setVolumeVal] = useState("");

  const { state, dispatch } = useSpotify();
  const { token, playerVolume } = state;

  useEffect(() => {
    setVolumeVal(playerVolume);
  }, [playerVolume]);

  const toggleVolume = () => {
    if (mute === false) {
      changeVolume(token, 0);
      setMute(true);
      setVolumeVal(0);
      dispatch({ type: "setPlayerVolume", payload: 0 });
    } else {
      changeVolume(token, volumeVal);
      setMute(false);
      dispatch({ type: "setPlayerVolume", payload: volumeVal });
    }
  };
  const setVolumeValue = (value) => {
    setVolumeVal(value);
    changeVolume(token, value);
    if (value === 0) {
      setMute(true);
    }
    dispatch({ type: "setPlayerVolume", payload: value });
  };

  return (
    <div className="flex gap-3 flex-1 justify-end">
      <TbMicrophone2
        className="text-[20px] text-[gray] hover:text-[#fff] self-center"
        title="Lyrics"
      />
      <BsStack
        className="text-[20px] text-[gray] hover:text-[#fff] self-center"
        title="Queue"
      />
      <BiDevices
        className="text-[20px] text-[gray] hover:text-[#fff] self-center"
        title="Devices"
      />
      <div className="flex gap-1">
        {mute ? (
          <BsVolumeMute
            className="text-[25px] text-[gray] hover:text-[#fff] self-center"
            onClick={() => toggleVolume()}
            title="Unmute"
          />
        ) : (
          <BsVolumeDown
            className="text-[25px] text-[gray] hover:text-[#fff]"
            onClick={() => toggleVolume()}
            title="Mute"
          />
        )}
        <div className="flex items-center ">
          <input
            type="range"
            className="volumeRange"
            min={0}
            max={100}
            value={volumeVal || ""}
            onChange={(e) => setVolumeValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
