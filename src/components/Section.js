import React from "react";

const Section = ({ children, title }) => {
  return (
    <div>
      <div className="text-lg font-bold text-slate-600 mt-4">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Section;
