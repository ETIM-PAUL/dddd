import React, { useState } from "react";
import { changeVolume } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import { BsVolumeDown, BsVolumeMute } from "react-icons/bs";
const Volume = () => {
  const [mute, setMute] = useState(false);
  const [volumeVal, setVolumeVal] = useState(30);
  console.log(volumeVal);

  const { state, dispatch } = useSpotify();
  const { token } = state;
  const toggleVolume = (volumeVal) => {
    setMute(!mute);
    if (mute === false) {
      changeVolume(token, 0);
    }
  };
  const setVolumeValue = (value) => {
    setVolumeVal(value);
    changeVolume(token, volumeVal);
    if (value === 0) {
      setMute(true);
    }
  };
  // useEffect(() => {}, [dispatch, token]);

  return (
    <>
      {mute ? (
        <BsVolumeMute
          className="text-[25px] text-[gray] hover:text-[#fff] self-center"
          onClick={() => toggleVolume()}
        />
      ) : (
        <BsVolumeDown
          className="text-[25px] text-[gray] hover:text-[#fff]"
          onClick={() => toggleVolume(volumeVal)}
        />
      )}
      <div className="flex items-center">
        <input
          type="range"
          min={0}
          max={100}
          className="w-[6rem] h-[0.3rem] p-[0] "
          onMouseUp={(e) => setVolumeValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default Volume;
