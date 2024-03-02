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
  const [delay, updateDelay] = useState(0.1); // seconds
  const [isActive, setIsActive] = useState(false);
  const [isSimulationFinished, setIsSimulationFinished] = useState(false);
  const [simulationData, updateSimulationData] = useState([]);
  const [bestAction, updateBestAction] = useState(-1);

  const setUpSimulationData = () => {
    const resetedBanditsData = banditsData.map((bandit, index) => {
      const simulationBandit = {
        ...bandit,
        clicks: 0,
        Q: 0,
      };
      return simulationBandit;
    });

    const expectedValues = resetedBanditsData.map((bandit) => bandit.q);
    const bestActionIndex = findMaxValueIndex(expectedValues);

    updateBestAction(bestActionIndex);
    updateSimulationData(resetedBanditsData);
  };

  useEffect(() => {
    setIsActive(true);

    // RESET BANDITS DATA
    setUpSimulationData();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // const initialEstimatedValues = simulationData.map((bandit) => 0);

    // setEstimatedValues(initialEstimatedValues);

    if (actions.length <= steps) {
      const intervalId = setInterval(() => {
        // AGENT DECIDES WHAT ACTION TO CHOOSE
        // FIRSTLY FINDS MAX Q(a)
        // AND IF Math.random() < EPSILON, AGENT DECIDES TO CHOOSE ANOTHER ACTION (EXPLORATION, NON-GREEDY)
        // IF EPSILON === 0 (EXPLOITATION, GREEDY)

        const estimatedValues = simulationData.map((bandit) => bandit.Q);
        const nextAction = getNextAction(estimatedValues, epsilon);

        let nextReward = null;

        updateSimulationData((prevBanditsData) => {
          return prevBanditsData.map((bandit) => {
            if (bandit.id === nextAction) {
              const target = bandit.distribution.drawNumber();
              const old_estimate = bandit.Q;
              const step_size = 1 / bandit.clicks;
              nextReward = target;

              return {
                ...bandit,
                clicks: bandit.clicks + 1,
                // INCREMENTAL ACTION VALUE ESTIMATION FORMULA
                // Qn+1 = Qn + 1/n(Rn - Qn)
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
        });

        // UDPATE LAST REWARDS
        setRewards((prevRewards) => [...prevRewards, nextReward]);

        // ADD ACTION TO actions
        setActions((prevActions) => [...prevActions, nextAction]);
      }, delay * 1000); // ms

      return () => clearInterval(intervalId);
    } else {
      setIsActive(false);
      setIsSimulationFinished(true);
    }
  }, [actions, isActive]);

  const toggleAgentActivity = () =>
    setIsActive((prevIsActive) => !prevIsActive);

  const resetSimulation = () => {
    setUpSimulationData();
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
        <div className="h-[50vh] overflow-auto">
          {/* AGENT INDEX ROW */}
          <AgentActionsIndexRow />

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
