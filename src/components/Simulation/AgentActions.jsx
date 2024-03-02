import React from "react";
import AgentAction from "./AgentAction";

const AgentActions = ({ actions, rewards, bestAction }) => {
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
