import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const keyboard = () => {
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
  return <Keyboard physicalKeyboardHighlight={true} layout={newLayout} />;
};

export default keyboard;
