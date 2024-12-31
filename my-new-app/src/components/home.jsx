import React, { useState, useEffect } from "react";
import Keyboard from "./keyboard.jsx";

const home = () => {
  const [count, setCount] = useState(0);
  const [phrase, setPhrase] = useState("");

  var shift = false;

  const generateQuote = async () => {
    setPhrase(await window.electronAPI.getQuote());
  };

  const onKeyPress = (event) => {
    if (event.keyCode == 16) {
      return;
    }
    if (shift) {
      setPhrase(
        (prev) => prev + String.fromCharCode(event.keyCode).toUpperCase()
      );
    } else {
      setPhrase(
        (prev) => prev + String.fromCharCode(event.keyCode).toLowerCase()
      );
    }
    setCount(event.keyCode);
  };

  const changeShift = (event) => {
    if (!(event.keyCode == 16)) {
      return;
    }
    console.log(event.keyCode);
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
        <p className="absolute top-4">
          WPM{" "}
          <strong>
            {phrase} {count}
          </strong>
        </p>
        <Keyboard />
      </div>
    </div>
  );
};

export default home;
