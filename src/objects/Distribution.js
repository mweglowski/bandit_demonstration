export class Distribution {
  constructor() {
    const magicValue = Math.round(Math.random() * 100, 2);
    // divide into few fractions
    // |   30%  |  20% |  50%  |
    // | 1, 5, 8| 9-20 |  100  |

    // fractions
    // |  1  |   2   |    3    |
    this.fractionQuantity = Math.round(Math.random() * 4 + 1, 2);

    // generating random distribution points and sorting them
    // | 22   33     75   93 |
    let fractionsPointsInPercantageDistribution = [];
    if (this.fractionQuantity !== 1) {
      for (let i = 0; i < this.fractionQuantity - 1; i++) {
        fractionsPointsInPercantageDistribution.push(
          Math.round(Math.random() * 100, 2)
        );
      }
    }
    // sorting
    fractionsPointsInPercantageDistribution.sort((a, b) => a - b);

    // assigning percentages for fractions
    // |   44%  |  20% |  36%  |
    // for each bar draw if it should be n numbers or range of numbers
    // | n fixed numbers -> 1, 5, 8 | or | range -> 5 - 20 |
    let fractions = [];
    for (let i = 0; i < this.fractionQuantity; i++) {
      let fraction = {
        id: i,
        areaPercentage: 100,
        isRange: Math.random() > 0.5 ? 1 : 0,
        numbers: [],
      };

      // area percentage
      if (this.fractionQuantity !== 1) {
        if (i === 0) {
          fraction.areaPercentage = fractionsPointsInPercantageDistribution[0];
        } else if (i === this.fractionQuantity - 1) {
          fraction.areaPercentage =
            100 - fractionsPointsInPercantageDistribution[i - 1];
        } else {
          const currentPoint = fractionsPointsInPercantageDistribution[i];
          const lastPoint = fractionsPointsInPercantageDistribution[i - 1];
          fraction.areaPercentage = currentPoint - lastPoint;
        }
      }

      let maxNumberFromPreviousFraction = 0;
      if (i !== 0) {
        maxNumberFromPreviousFraction =
          fractions[i - 1].numbers[fractions[i - 1].numbers.length - 1];
      }

      // numbers -> fixed or range
      if (fraction.isRange === 0) {
        const fixedNumbersQuantity = Math.round(Math.random() * 4 + 1, 2);

        for (let i = 0; i < fixedNumbersQuantity; i++) {
          fraction.numbers.push(
            maxNumberFromPreviousFraction +
              Math.round(Math.random() * magicValue, 2)
          );
        }
      } else {
        fraction.numbers = [
          maxNumberFromPreviousFraction +
            Math.round(Math.random() * magicValue, 2),
          maxNumberFromPreviousFraction +
            Math.round(Math.random() * magicValue, 2),
        ];
      }
      fraction.numbers.sort((a, b) => a - b);

      fractions.push(fraction);
    }
  }

  drawNumber() {}

  get q() {
    // return Number(this.upBoundary - this.downBoundary);
    return "q";
  }
}
