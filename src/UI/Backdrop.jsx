import React from "react";

const Backdrop = ({ children }) => {
  return (
    <div
      className="absolute w-[100vw] h-[100vh] bg-slate-900 top-0 opacity-90 fade-in-backdrop-animation"
    >
      {children}
    </div>
  );
};

export default Backdrop;
