import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import BanditDetails from "./BanditDetails";
import Section from "../UI/Section";

const SimulationContent = ({ toggleDisplay, banditsData }) => {
  // State to store actions
  const [actions, setActions] = useState([]);
  const [epsilon, updateEpsilon] = useState(0.1);
  const [steps, updateSteps] = useState(5);
  const [delay, updateDelay] = useState(1); // seconds
  const [isActive, setIsActive] = useState(true);
  const [isSimulationFinished, setIsSimulationFinished] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (actions.length < steps) {
      const intervalId = setInterval(() => {
        const newAction = `Action ${actions.length + 1}`;
        setActions((prevActions) => [...prevActions, newAction]);
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
      <div className="h-[60vh] overflow-auto">
        <p>Agent Actions:</p>
        {actions.map((action, index) => (
          <div key={index} className="fade-in-animation">
            {action}
          </div>
        ))}
      </div>

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
