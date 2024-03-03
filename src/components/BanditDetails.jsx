import React from "react";
import BanditDetail from "./BanditDetail";
import { useBanditContext } from "../context/BanditContext";

const BanditDetails = ({ simulationData }) => {
  const { banditsData } = useBanditContext();

  const dataToPass = simulationData ? simulationData : banditsData;

  return (
    <div className="w-100% flex">
      <div className="text-slate-500">
        <p>Clicks</p>
        <p>q(a)</p>
        <p>Q(a)</p>
      </div>
      {dataToPass.map((banditData) => (
        <BanditDetail data={banditData} key={`detail-${banditData.id}`} />
      ))}
    </div>
  );
};

export default BanditDetails;
