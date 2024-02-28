import React, { useState } from "react";

const BanditButton = ({ onButtonClick, data }) => {
  const [key, setKey] = useState(0);
  const { id, lastDrawnNumber } = data;

  const buttonClickHandler = () => {
    onButtonClick(id);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className="rounded-lg mx-2 border-[2px] border-transparent bg-slate-900 hover:border-teal-700 h-[5em] w-[5em] shadow-md shadow-teal-800 hover:cursor-pointer hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-800 duration-300 flex justify-center items-center"
      onClick={buttonClickHandler}
    >
      {/* DRAWN NUMBER */}
      {/* after each change on key prop, p element re-renders */}
      <p key={key} className="fade-in-animation">
        {lastDrawnNumber}
      </p>
    </div>
  );
};

export default BanditButton;
