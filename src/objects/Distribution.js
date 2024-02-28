import { createDistributionPoints } from "../utils/createDistributionPoints";
import { calculateExpected } from "../utils/calculateExpected";
import { createFractions } from "../utils/createFractions";

export class Distribution {
  constructor() {
    // divide into few fractions
    // |   30%  |  20% |  50%  |
    // | 1, 5, 8| 9-20 |  100  |

    // fractions
    // |  1  |   2   |    3    |
    const fractionQuantity = Math.round(Math.random() * 4 + 1);

    // generating random distribution points and sorting them
    // | 22   33     75   93 |
    const fractionsPointsInPercantageDistribution = createDistributionPoints(fractionQuantity);

    // assigning percentages for fractions
    // |   44%  |  20% |  36%  |
    // for each bar draw if it should be n numbers or range of numbers
    // | n fixed numbers -> 1, 5, 8 | or | range -> 5 - 20 |
    this.fractions = createFractions(fractionsPointsInPercantageDistribution);
    
    // calculating q (expected)
    this.q = calculateExpected(this.fractions);
  }

  drawNumber() {
    // draw random point in percentage 0-100%
    const randomPoint = Math.round(Math.random() * 100);

    // we have to decide which fraction contains randomPoint
    let drawnFractionIndex = 0;

    let currentPercent = 0;
    if (this.fractions.length !== 1) {
      for (let i = 0; i < this.fractions.length; i++) {
        const fraction = this.fractions[i];

        if (
          randomPoint > currentPercent &&
          randomPoint <= currentPercent + fraction.areaPercentage
        ) {
          drawnFractionIndex = i;
          break;
        }
        currentPercent += fraction.areaPercentage;
      }
    }

    // extracting number from fraction with drawnFractionIndex
    const drawnFraction = this.fractions[drawnFractionIndex];

    let drawnNumber = 0;
    // RANGE
    if (drawnFraction.isRange === 1) {
      const downBoundary = drawnFraction.numbers[0];
      const upBoundary = drawnFraction.numbers[1];
      drawnNumber =
        downBoundary + Math.round(Math.random() * (upBoundary - downBoundary));
      // FIXED
    } else {
      const randomNumberIndex = Math.round(
        Math.random() * (drawnFraction.numbers.length - 1)
      );
      drawnNumber = drawnFraction.numbers[randomNumberIndex];
    }

    return drawnNumber;
  }
}
