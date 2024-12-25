import React, { useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const home = () => {
  const [count, setCount] = useState(0);
  const [phrase, setPhrase] = useState("");

  var shift = false;

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
    document.addEventListener("keyup", handleKeyPress);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const newLayout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{shiftleft} z x c v b n m , . / {shiftright}",
      "{space}",
    ],
    shift: [
      "~ ! @ # $ % ^ &amp; * ( ) _ + {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shiftleft} Z X C V B N M &lt; &gt; ? {shiftright}",
      ".com @ {space}",
    ],
  };

  return (
    <div className="App h-[100vh]">
      <div className="flex flex-col h-[100%] justify-center items-end">
        <p className="absolute top-4">
          WPM{" "}
          <strong>
            {phrase} {count}
          </strong>
        </p>
        <Keyboard physicalKeyboardHighlight={true} layout={newLayout} />
      </div>
    </div>
  );
};

export default home;
