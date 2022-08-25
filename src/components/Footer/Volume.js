import React, { useState } from "react";
import { changeVolume } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import { BsVolumeDown, BsVolumeMute } from "react-icons/bs";
const Volume = () => {
  const [mute, setMute] = useState(false);
  const [volumeVal, setVolumeVal] = useState(30);

  const { state, dispatch } = useSpotify();
  const { token } = state;
  const toggleVolume = (mute) => {
    if (mute === false) {
      changeVolume(token, 0);
      setMute(true);
    } else {
      setMute(false);
      changeVolume(token, volumeVal);
    }
  };
  const setVolumeValue = (value) => {
    setVolumeVal(value);
    changeVolume(token, value);
    if (value === 0) {
      setMute(true);
    }
  };

  return (
    <div className="flex gap-1">
      {mute ? (
        <BsVolumeMute
          className="text-[25px] text-[gray] hover:text-[#fff] self-center"
          onClick={() => toggleVolume()}
        />
      ) : (
        <BsVolumeDown
          className="text-[25px] text-[gray] hover:text-[#fff]"
          onClick={() => toggleVolume(mute)}
        />
      )}
      <div className="flex items-center">
        <input
          type="range"
          min={0}
          max={100}
          className="w-[6rem] h-[0.3rem]"
          onMouseUp={(e) => setVolumeValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Volume;
