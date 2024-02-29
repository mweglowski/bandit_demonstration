import React from "react";

const Button = ({ onButtonClick, children, classNames = "" }) => {
  const buttonClassNames =
    "bg-black border-[1px] px-4 py-1 rounded-md text-slate-400 border-slate-400 hover:border-slate-300 hover:text-slate-300 duration-300 text-center " +
    classNames;

  return (
    <button className={buttonClassNames} onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default Button;
