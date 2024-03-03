import React from "react";
import BanditDetail from "./BanditDetail";
import { useBanditContext } from "../context/BanditContext";

const BanditDetails = ({ data }) => {
  const { banditsData } = useBanditContext();

  return (
    <div className="w-100% flex">
      <div className="text-slate-500">
        <p>Clicks</p>
        <p>q(a)</p>
        <p>Q(a)</p>
      </div>
      {banditsData.map((banditData) => (
        <BanditDetail data={banditData} key={`detail-${banditData.id}`} />
      ))}
    </div>
  );
};

export default BanditDetails;
