import React from "react";

const BanditDetail = ({ data }) => {
  const {clicks, q, Q} = data

  return (
    // DETAIL
    <div className="flex flex-1 flex-col items-center text-slate-400">
      {/* CLICK COUNT */}
      <p>{clicks}</p>

      {/* q(a) */}
      <p>{q}</p>

      {/* Q(a) */}
      <p>{Q}</p>
    </div>
  );
};

export default BanditDetail;
