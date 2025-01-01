import React, { useState, useEffect } from "react";
import Keyboard from "./keyboard.jsx";
import compare from "../util/compareStrings.jsx";

const home = () => {
  const [count, setCount] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [finishedPhrase, setFinishedPhrase] = useState("");

  var phraseMut = "";
  var finishedPhraseMut = "";
  var shift = false;

  const changePhrase = (s) => {
    phraseMut = s;
    setPhrase(s);
  };
  const changeFinishedPhrase = (s) => {
    finishedPhraseMut = s;
    setFinishedPhrase(s);
  };

  const generateQuote = async () => {
    changePhrase(await window.electronAPI.getQuote());
  };

  const onKeyPress = (event) => {
    if (event.keyCode == 16) {
      return;
    } else if (compare(phraseMut, event.keyCode, shift)) {
      changeFinishedPhrase(finishedPhraseMut + phraseMut[0]);
      changePhrase(phraseMut.slice(1));
    }
    if (event.keyCode == 32 && event.target == document.body) {
      event.preventDefault();
    }
    setCount(event.keyCode);
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

  const handleKeyPress = async (event) => {
    if (event.type == "keyup") {
      changeShift(event);
    } else {
      await onKeyPress(event);
      await changeShift(event);
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
        <p className="absolute top-4">WPM {count}</p>
        <p>
          <strong>{finishedPhrase}</strong>
          {phrase}
        </p>
        <Keyboard />
      </div>
    </div>
  );
};

export default home;
