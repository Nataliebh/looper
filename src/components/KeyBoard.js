import React, { useState, useEffect } from "react";
import { BsPauseCircleFill } from "react-icons/bs";

const KeyBoard = ({
  icon,
  url,
  freeze,
  addToAudioArray,
  removeFromAudioArray,
  id,
}) => {
  //state = creating an audio
  const [audio] = useState(new Audio(url));

  //state = play / stop playing
  const [playing, setPlaying] = useState(false);

  //changes every [playing, audio] render: if state playing true - play the audio in loop
  useEffect(() => {
    audio.playbackRate = 1.0;
    audio.currentTime = 0;
    playing ? audio.play() : audio.pause();
    audio.loop = playing;
  }, [playing, audio]);

  const toggle = () => {
    !playing ? addToAudioArray(audio) : removeFromAudioArray(audio.src);
    setPlaying(!playing);
  };

  return (
    <button
      disabled={freeze ? true : false}
      className="key-pad"
      onClick={toggle}
    >
      {playing ? <BsPauseCircleFill /> : icon}
    </button>
  );
};

export default KeyBoard;
