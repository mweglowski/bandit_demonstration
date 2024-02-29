import React from "react";

const Section = ({ children, title, animation }) => {
  return (
    <div className={animation}>
      <div className="text-lg font-bold text-slate-600 mt-4">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Section;
