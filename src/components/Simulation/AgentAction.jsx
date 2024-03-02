import React from "react";

const AgentAction = React.memo(({ action, reward, bestAction }) => {
  const agentActionStyle =
    bestAction === action ? { animation: "agentBestActionAnimation 1.5s ease-in-out" } : {};

  console.log(action, reward, bestAction)

  return (
    <div className="flex gap-2 fade-in-animation">
      {[0, 1, 2, 3].map((item) => {
        // Using item as key
        const key = `action-${item}`;
        if (action === item) {
          return (
            <div
              key={key}
              className="agent-action-record relative"
              style={agentActionStyle}
            >
              {reward}
              <div className="pop-in-animation absolute z-10 right-0 opacity-0 bottom-0">
                🤖
              </div>
            </div>
          );
        } else {
          return <div key={key} className="agent-action-record opacity-0" />;
        }
      })}
    </div>
  );
});

export default AgentAction;
