import React, { useState, useEffect } from "react";
import KeyBoard from "./components/KeyBoard";
import keys from "./data/data";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

const App = () => {
  const [freeze, setFreeze] = useState(false);
  const [playingAudio, setPlayingAudio] = useState([]); //state of array

  //synchronise the audio from 0
  useEffect(() => {
    playingAudio.forEach((audio) => (audio.currentTime = 0));
  }, [playingAudio]);

  // add to playingAudio array to the last state
  const addToAudioArray = (audio) => {
    setPlayingAudio((prevState) => [...prevState, audio]);
  };

  // remove from playingAudio array
  const removeFromAudioArray = (src) => {
    const allAudios = playingAudio.filter((audio) => audio.src !== src);
    setPlayingAudio(allAudios);
  };

  // on switch button turn ON / OFF ALL of the buttons
  const switchAllButtons = () => {
    playingAudio.forEach((audio) => audio.pause());
    setPlayingAudio([]);
    setFreeze(!freeze);
  };

  return (
    <>
      <NavigationBar />
      <div className="looper-container">
        <h1>Grooveo</h1>
        <div className="wrapper">
          <label className="switch">
            <input type="checkbox" id="togBtn" onChange={switchAllButtons} />
            <div className="slider round">
              <span className="on">ON</span>
              <span className="off">OFF</span>
            </div>
          </label>
          <div className="keyboard">
            {keys.map((key) => (
              <KeyBoard
                icon={key.icon}
                url={key.url}
                key={key.id}
                id={key.id}
                freeze={freeze}
                addToAudioArray={addToAudioArray}
                removeFromAudioArray={removeFromAudioArray}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
