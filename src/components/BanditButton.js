import React from "react";

const BanditButton = ({ onButtonClick, data }) => {
  const buttonClickHandler = () => {
    onButtonClick(data.id);
  };

  return (
    <div
      className="rounded-lg mx-2 border-[3px] border-teal-700 h-[5em] w-[5em] shadow-md shadow-teal-800 hover:cursor-pointer hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-800 duration-300"
      onClick={buttonClickHandler}
    />
  );
};

export default BanditButton;
