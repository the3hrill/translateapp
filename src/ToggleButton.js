// ToggleButton.js
import React from 'react';

function ToggleButton() {
  function myfunction() {
    var element = document.body;
    element.classList.toggle('DarkMode');
  }

  return (
    <button onClick={myfunction} className="theButton">
      Mode Change
    </button>
  );
}

export default ToggleButton;
