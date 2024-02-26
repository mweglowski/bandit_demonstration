import React, { useRef, useState, useEffect } from "react";
import PercentageBar from "./PercentageBar";

const PercentageBars = ({ data }) => {
  const percentageBarsRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { distribution } = data;

  useEffect(() => {
    const updateWidth = () => {
      if (percentageBarsRef.current) {
        setWidth(percentageBarsRef.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex" ref={percentageBarsRef}>
      {distribution.fractions.map((fraction) => {
        const percentageBarWidth = width * (fraction.areaPercentage / 100);

        return (
          <PercentageBar
            key={Math.random()}
            data={fraction}
            width={percentageBarWidth}
          />
        );
      })}
    </div>
  );
};

export default PercentageBars;
