import React from "react";

const BanditButton = ({ onButtonClick, data }) => {
  const buttonClickHandler = () => {
    onButtonClick(data.id);
  };

  return (
    <div
      className="rounded-lg mx-2 border-[3px] border-emerald-800 h-[5em] w-[5em] shadow-md shadow-emerald-800 hover:cursor-pointer hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-800 duration-300"
      onClick={buttonClickHandler}
    />
  );
};

export default BanditButton;
