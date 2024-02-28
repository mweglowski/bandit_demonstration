import React, { useState, useRef, useEffect } from "react";

const PercentageBar = ({ data, width }) => {
  // numbers display
  const [areNumbersDisplayed, updateNumbersDisplay] = useState(false);

  // distances
  const [distanceToRight, setDistanceToRight] = useState(0);
  const [distanceToLeft, setDistanceToLeft] = useState(0);

  // widths
  const [barWidth, setBarWidth] = useState(0);
  const [numbersWidth, setNumbersWidth] = useState(0);

  // refs
  const numbersContainerRef = useRef(null);
  const barRef = useRef(null);

  const { areaPercentage: percentage, numbers, color, isRange } = data;

  useEffect(() => {
    // updating distances & setting widths
    const updateDistance = () => {
      setBarWidth(barRef.current.offsetWidth);
      setNumbersWidth(numbersContainerRef.current.offsetWidth);

      const barOffsetLeft = barRef.current.offsetLeft;

      const windowWidth = window.innerWidth;

      const distanceToRightBorder =
        windowWidth - barOffsetLeft - barRef.current.offsetWidth;
      const distanceToLeftBorder = barOffsetLeft;

      setDistanceToRight(distanceToRightBorder);
      setDistanceToLeft(distanceToLeftBorder);
    };

    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, []);

  // numbers display on hover
  const numbersDisplayHandler = () => {
    updateNumbersDisplay((prevDisplay) => {
      return !prevDisplay;
    });
  };

  // set or range of numbers shown on hover
  const numbersString =
    isRange === 1 ? (
      <span style={{ whiteSpace: "nowrap" }}>
        {numbers[0]}-{numbers[1]}
      </span>
    ) : (
      <span style={{ whiteSpace: "nowrap" }}>{numbers.join(", ")}</span>
    );

  // POSITIONING NUMBERS
  let numbersPositionStyle = {};
  if (numbersWidth > barWidth) {
    // CHECK IF GOES BEYOND RIGHT BORDER
    if (numbersWidth - barWidth >= distanceToRight) {
      // right
      numbersPositionStyle = { right: 0 };
      // CHECK IF GOES BEYOND LEFT BORDER
    } else if (numbersWidth - barWidth >= distanceToLeft) {
      // left
      numbersPositionStyle = { left: 0 };
    } else {
      const rightValue = -(numbersWidth - barWidth) / 2;
      numbersPositionStyle = { right: `${rightValue}px` };
    }
  } else {
    // middle
    const rightValue = (barWidth - numbersWidth) / 2;
    numbersPositionStyle = { right: `${rightValue}px` };
  }

  return (
    <div
      style={{ width, backgroundColor: color, boxShadow: `0 0 0.7em ${color}` }}
      className="rounded-md text-slate-300 flex relative hover:opacity-100 hover:cursor-pointer duration-300 opacity-80"
      ref={barRef}
      onMouseEnter={numbersDisplayHandler}
      onMouseLeave={numbersDisplayHandler}
    >
      <p className="mx-auto">{percentage}%</p>

      {/* NUMBERS */}
      <div
        className="absolute bottom-6 bg-black rounded-md px-2 shadow-md shadow-black"
        style={{
          ...numbersPositionStyle,
          opacity: areNumbersDisplayed ? 1 : 0,
        }}
        ref={numbersContainerRef}
      >
        {numbersString}
      </div>
    </div>
  );
};

export default PercentageBar;
