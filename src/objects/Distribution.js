export class Distribution {
  constructor() {
    // value that makes distribution more random
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
        let newPoint = Math.round(Math.random() * 100, 2);

        while (newPoint > 95 || newPoint < 5) {
          newPoint = Math.round(Math.random() * 100, 2);
        }

        fractionsPointsInPercantageDistribution.push(newPoint);
      }
    }
    // sorting
    fractionsPointsInPercantageDistribution.sort((a, b) => a - b);

    // assigning percentages for fractions
    // |   44%  |  20% |  36%  |
    // for each bar draw if it should be n numbers or range of numbers
    // | n fixed numbers -> 1, 5, 8 | or | range -> 5 - 20 |
    this.fractions = [];
    for (let i = 0; i < this.fractionQuantity; i++) {
      let fraction = {
        id: i,
        areaPercentage: 100,
        isRange: Math.random() > 0.5 ? 1 : 0,
        numbers: [],
        color: `rgb(0, ${Math.round(Math.random() * 90 + 50)}, ${Math.round(
          Math.random() * 50 + 90
        )})`,
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

      let maxPreviousNumber = 1;
      if (i !== 0) {
        maxPreviousNumber =
          this.fractions[i - 1].numbers[
            this.fractions[i - 1].numbers.length - 1
          ];
      }

      // numbers -> fixed or range
      // drawing numbers
      // FIXED
      if (fraction.isRange === 0) {
        const fixedNumbersQuantity = Math.round(Math.random() * 4 + 1, 2);

        for (let i = 0; i < fixedNumbersQuantity; i++) {
          fraction.numbers.push(
            maxPreviousNumber + Math.round(Math.random() * magicValue, 2)
          );

          // preventing from drawing same number again
          maxPreviousNumber = fraction.numbers[fraction.numbers.length - 1];
        }
        // RANGE
      } else {
        fraction.numbers = [
          maxPreviousNumber + Math.round(Math.random() * magicValue, 2),
          maxPreviousNumber + Math.round(Math.random() * magicValue, 2),
        ];
      }
      fraction.numbers.sort((a, b) => a - b);

      this.fractions.push(fraction);
    }

    // calculating q (expected)
    this.q = 0;

    let totalSum = 0;
    Array.from(this.fractions).forEach((fraction) => {
      let mean = 0;
      if (fraction.isRange === 0) {
        for (let i = 0; i < fraction.numbers.length; i++) {
          mean += fraction.numbers[i];
        }

        mean /= fraction.numbers.length;
      } else {
        mean = (fraction.numbers[0] + fraction.numbers[1]) / 2;
      }

      totalSum += fraction.areaPercentage * mean;
    });

    this.q = Number((totalSum / 100).toFixed(2));

    console.log(this.fractions);
  }

  drawNumber() {}
}
