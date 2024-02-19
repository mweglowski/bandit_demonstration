import React from "react";
import BanditDetail from "./BanditDetail";

const BanditDetails = ({ data }) => {
  return (
    <div className="w-100% border-2 border-yellow-500 flex">
      {data.map((banditData) => (
        <BanditDetail data={banditData} key={`detail-${banditData.id}`} />
      ))}
    </div>
  );
};

export default BanditDetails;
