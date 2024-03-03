import React from "react";
import AgentAction from "./AgentAction";
import { useBanditContext } from "../../context/BanditContext";

const AgentActions = ({ actions, rewards }) => {
  const { banditsData } = useBanditContext();
  
  let bestAction = -1;
  for (let i = 0; i < banditsData.length; i++) {
    if (banditsData[i].best) {
      bestAction = i;
    }
  }

  return (
    <div className="flex flex-col-reverse gap-1 mt-1 pb-4">
      {actions.map((action, index) => (
        <AgentAction
          key={index}
          action={action}
          reward={rewards[index]}
          bestAction={bestAction}
        />
      ))}
    </div>
  );
};

export default AgentActions;
