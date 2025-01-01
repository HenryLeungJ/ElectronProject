import React, { useState, useEffect } from "react";
import Keyboard from "./keyboard.jsx";
import compare from "../util/compareStrings.jsx";

const home = () => {
  const [phrase, setPhrase] = useState("");
  const [finishedPhrase, setFinishedPhrase] = useState("");
  const [ended, setEnded] = useState(false);
  const [WPM, setWPM] = useState(0);

  var phraseMut = "";
  var finishedPhraseMut = "";
  var shift = false;
  var len = 0;
  let startTime;
  let endTime;
  let started = false;

  const restartOperation = () => {
    setPhrase("");
    setFinishedPhrase("");
    setEnded(false);
    setWPM(0);
  };

  const changePhrase = (s) => {
    phraseMut = s;
    setPhrase(s);
  };
  const changeFinishedPhrase = (s) => {
    finishedPhraseMut = s;
    setFinishedPhrase(s);
  };

  const generateQuote = async () => {
    const quote = await window.electronAPI.getQuote();
    changePhrase(quote);
    len = quote.split(" ").length;
    console.log(len);
  };

  const onKeyPress = (event) => {
    if (event.keyCode == 16) {
      return;
    } else if (shift && event.keyCode == 13) {
      window.location.reload();
      restartOperation();
    } else if (compare(phraseMut, event.keyCode, shift)) {
      if (!started) {
        started = true;
        startTime = new Date();
      }
      changeFinishedPhrase(finishedPhraseMut + phraseMut[0]);
      changePhrase(phraseMut.slice(1));
      if (phraseMut.length == 0) {
        setEnded(true);
        endTime = new Date();
        setWPM(len / ((endTime - startTime) / 60000));
      }
    }
    if (event.keyCode == 32 && event.target == document.body) {
      event.preventDefault();
    }
  };

  const changeShift = (event) => {
    if (!(event.keyCode == 16)) {
      return;
    }
    if (!shift && event.type == "keydown") {
      shift = true;
    } else if (shift && event.type == "keyup") {
      shift = false;
    }
  };

  const handleKeyPress = (event) => {
    if (event.type == "keyup") {
      changeShift(event);
    } else {
      onKeyPress(event);
      changeShift(event);
    }
  };

  useEffect(() => {
    generateQuote();
    document.addEventListener("keyup", handleKeyPress);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="App h-[100vh]">
      <div className="flex flex-col h-[100%] justify-center items-end">
        <p className="absolute top-4">Press Shift + Enter to Restart</p>
        {!ended ? (
          <>
            <p>
              <strong>{finishedPhrase}</strong>
              {phrase}
            </p>
            <Keyboard />
          </>
        ) : (
          <h1 className="bold text-xl">{WPM}</h1>
        )}
      </div>
    </div>
  );
};

export default home;
