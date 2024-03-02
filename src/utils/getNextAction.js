import { allSame } from "./allSame";
import { findMaxValueIndex } from "./findMaxValueIndex";

export const getNextAction = (estimatedValues, epsilon) => {
  let nextAction = -1;
  if (allSame(estimatedValues)) {
    // SELECT RANDOM ACTION
    nextAction = Math.round(Math.random() * 3);
  } else {
    // SELECT ACTION WITH THE HIGHEST ESTIMATED VALUE
    nextAction = findMaxValueIndex(estimatedValues);

    // CHECK IF Math.random() < EPSILON, IF YES CHECK ANOTHER RANDOM ACTION
    if (Math.random() < epsilon) {
      const actionsWithLowerValues = [0, 1, 2, 3].filter(
        (action) => action !== nextAction
      );

      const nextActionIndex = Math.round(
        Math.random() * actionsWithLowerValues.length
      );
      nextAction = actionsWithLowerValues[nextActionIndex];
    }
  }

  return nextAction;
};
