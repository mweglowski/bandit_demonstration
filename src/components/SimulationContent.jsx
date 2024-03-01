import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import BanditDetails from "./BanditDetails";
import Section from "../UI/Section";
import { allSame } from "../utils/allSame";

const SimulationContent = ({
  toggleDisplay,
  banditsData,
  updateBanditsData,
}) => {
  const [estimatedValues, setEstimatedValues] = useState([]);
  const [actions, setActions] = useState([]);
  const [epsilon, updateEpsilon] = useState(0.1);
  const [steps, updateSteps] = useState(5);
  const [delay, updateDelay] = useState(1); // seconds
  const [isActive, setIsActive] = useState(true);
  const [isSimulationFinished, setIsSimulationFinished] = useState(false);

  // useEffect(() => {
  //   const initialEstimatedValues = banditsData.map((bandit) => bandit.Q);

  //   setEstimatedValues(initialEstimatedValues);
  // }, []);

  useEffect(() => {
    if (!isActive) return;

    const initialEstimatedValues = banditsData.map((bandit) => bandit.Q);

    setEstimatedValues(initialEstimatedValues);

    if (actions.length < steps) {
      const intervalId = setInterval(() => {
        // AGENT DECIDES WHAT ACTION TO CHOOSE
        // FIRSTLY FINDS MAX Q(a) 
        // AND IF Math.random() < EPSILON, AGENT DECIDES TO CHOOSE ANOTHER ACTION (EXPLORATION, NON-GREEDY)
        // IF EPSILON === 0 (EXPLOITATION, GREEDY)

        let nextAction = -1;
        if (allSame(estimatedValues)) {
          // SELECT RANDOM ACTION
          nextAction = Math.round(Math.random() * 4);
        } else {
          // SELECT ACTION WITH THE HIGHEST ESTIMATED VALUE
          nextAction = estimatedValues.index(Math.max(estimatedValues));

          // CHECK IF Math.random() < EPSILON, IF YES CHECK ANOTHER RANDOM ACTION
          if (Math.random() < epsilon) {
            const actionsWithLowerValues = [0, 1, 2, 3].filter(
              (action) => action != nextAction
            );

            const nextActionIndex = Math.round(Math.random() * actionsWithLowerValues.length)
            nextAction = actionsWithLowerValues[nextActionIndex]
          }
        }

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
    setActions([]);
    setIsActive(true);
  };

  const epsilonChangeHandler = (e) => {
    e.preventDefault();

    updateEpsilon(e.target.current.value);
  };

  const stepChangeHandler = (e) => {
    e.preventDefault();

    updateSteps(e.target.current.value);
  };

  const delayChangeHandler = (e) => {
    e.preventDefault();

    updateDelay(e.current.target.value);
  };

  return (
    <div className="p-2 max-w-[600px] mx-auto pt-[10%]">
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
        <BanditDetails data={banditsData} />
      </Section>

      {/* AGENT ACTIONS TABLE */}
      <Section title="Agent Actions">
        <div className="h-[50vh] overflow-auto">
          {/* AGENT INDEX ROW */}
          <div className="flex gap-2">
            <div className="w-full text-center rounded-md bg-slate-800 text-slate-400">
              Action 1
            </div>
            <div className="w-full text-center rounded-md bg-slate-800 text-slate-400">
              Action 2
            </div>
            <div className="w-full text-center rounded-md bg-slate-800 text-slate-400">
              Action 3
            </div>
            <div className="w-full text-center rounded-md bg-slate-800 text-slate-400">
              Action 4
            </div>
          </div>

          {/* AGENT DECISIONS RECORDS */}
          {actions.map((action, index) => (
            <div key={index} className="fade-in-animation">
              {action}
            </div>
          ))}
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
