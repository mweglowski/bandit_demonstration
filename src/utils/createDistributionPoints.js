import { drawPoints } from "./drawPoints";
import { arePointsCorrectlyDistributed } from "./arePointsCorrectlyDistributed";

export const createDistributionPoints = (fractionQuantity) => {
  let fractionsPointsInPercantageDistribution = [];

  if (fractionQuantity !== 1) {
    fractionsPointsInPercantageDistribution = drawPoints(fractionQuantity);

    while (
      !arePointsCorrectlyDistributed(fractionsPointsInPercantageDistribution) ||
      fractionsPointsInPercantageDistribution.length === 0
    ) {
      fractionsPointsInPercantageDistribution = drawPoints(fractionQuantity);
    }
  }
  // sorting
  fractionsPointsInPercantageDistribution.sort((a, b) => a - b);

  return fractionsPointsInPercantageDistribution;
};
