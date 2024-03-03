import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import BanditDetails from "../BanditDetails";
import Section from "../../UI/Section";
import AgentActions from "./AgentActions";
import AgentActionsIndexRow from "./AgentActionsIndexRow";
import { findMaxValueIndex } from "../../utils/findMaxValueIndex";
import { getNextAction } from "../../utils/getNextAction";

const SimulationContent = ({
  toggleDisplay,
  banditsData,
  // updateBanditsData,
}) => {
  // const [estimatedValues, setEstimatedValues] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [actions, setActions] = useState([]);
  const [epsilon, updateEpsilon] = useState(0.1);
  const [steps, updateSteps] = useState(100);
  const [delay, updateDelay] = useState(0.5); // seconds
  const [isActive, setIsActive] = useState(false);
  const [isSimulationFinished, setIsSimulationFinished] = useState(false);
  const [simulationData, updateSimulationData] = useState([]);
  const [bestAction, updateBestAction] = useState(-1);

  const refreshSimulationData = () => {
    const initializedBanditsData = banditsData.map((bandit) => ({
      ...bandit,
      clicks: 0,
      Q: 0,
    }));

    const expectedValues = initializedBanditsData.map((bandit) => bandit.q);
    const bestActionIndex = findMaxValueIndex(expectedValues);

    updateBestAction(bestActionIndex);
    updateSimulationData(initializedBanditsData);
  };

  useEffect(() => {
    refreshSimulationData();
    setIsActive(true);
  }, [banditsData]);

  useEffect(() => {
    let intervalId;

    const updateSimulation = () => {
      if (actions.length < steps && isActive) {
        const nextAction = getNextAction(
          simulationData.map((bandit) => bandit.Q),
          epsilon
        );
        let actionUpdated = false;

        const updatedSimulationData = simulationData.map((bandit, index) => {
          if (index === nextAction) {
            actionUpdated = true;
            const target = bandit.distribution.drawNumber();
            const old_estimate = bandit.Q;
            const step_size = 1 / bandit.clicks;

            // INCREMENTAL ACTION VALUE ESTIMATION FORMULA
            // Qn+1 = Qn + 1/n(Rn - Qn)
            return {
              ...bandit,
              clicks: bandit.clicks + 1,
              Q:
                bandit.clicks === 0
                  ? target
                  : Number(
                      (
                        old_estimate +
                        step_size * (target - old_estimate)
                      ).toFixed(2)
                    ),
              lastDrawnNumber: target,
            };
          }
          return bandit;
        });

        if (actionUpdated) {
          updateSimulationData(updatedSimulationData);
          setActions((prevActions) => [...prevActions, nextAction]);
          setRewards((prevRewards) => [
            ...prevRewards,
            updatedSimulationData[nextAction].lastDrawnNumber,
          ]);
        }
      } else {
        setIsActive(false);
        setIsSimulationFinished(true);
        clearInterval(intervalId);
      }
    };

    if (isActive) {
      intervalId = setInterval(updateSimulation, delay * 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, actions, steps, delay, simulationData, epsilon]);

  const toggleAgentActivity = () =>
    setIsActive((prevIsActive) => !prevIsActive);

  const resetSimulation = () => {
    refreshSimulationData();
    setActions([]);
    setRewards([]);
    setIsActive(true);
    setIsSimulationFinished(false);
  };

  const epsilonChangeHandler = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) updateEpsilon(value);
  };

  const stepChangeHandler = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) updateSteps(value);
  };

  const delayChangeHandler = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0) updateDelay(value);
  };

  return (
    <div className="p-2 max-w-[600px] mx-auto pt-[5%]">
      {/* PARAMETERS */}
      <div className="flex justify-evenly max-w-[300px] mx-auto">
        <div className="parameter-input-container">
          <p>Epsilon (ϵ)</p>
          <input
            placeholder="Epsilon"
            className="parameter-input"
            defaultValue={epsilon}
            type="number"
            step={0.01}
            onChange={epsilonChangeHandler}
          />
        </div>
        <div className="parameter-input-container">
          <p>Steps</p>
          <input
            placeholder="Steps"
            className="parameter-input"
            defaultValue={steps}
            type="number"
            onChange={stepChangeHandler}
          />
        </div>
        <div className="parameter-input-container">
          <p>Delay</p>
          <input
            placeholder="Delay"
            className="parameter-input"
            defaultValue={delay}
            type="number"
            step={0.1}
            onChange={delayChangeHandler}
          />
        </div>
      </div>

      {/* ACTION DETAILS */}
      <Section title="Details">
        <BanditDetails data={simulationData} />
      </Section>

      {/* AGENT ACTIONS TABLE */}
      <Section title="Agent Actions">
        {/* AGENT INDEX ROW */}
        <div className={rewards.length > 10 ? "pr-[6px]" : ""}>
          <AgentActionsIndexRow />
        </div>

        <div className="h-[50vh] overflow-auto agent-actions-container">
          {/* AGENT DECISIONS RECORDS */}
          <AgentActions
            actions={actions}
            rewards={rewards}
            bestAction={bestAction}
          />
        </div>
      </Section>

      {/* CONTROL BUTTONS */}
      <div className="flex justify-evenly">
        <Button onButtonClick={toggleDisplay}>Back</Button>
        <Button
          onButtonClick={toggleAgentActivity}
          classNames={"w-[100px] " + (isSimulationFinished ? "opacity-0" : "")}
        >
          {isActive ? "Pause" : "Resume"}
        </Button>
        <Button onButtonClick={resetSimulation}>Reset</Button>
      </div>
    </div>
  );
};

export default SimulationContent;
