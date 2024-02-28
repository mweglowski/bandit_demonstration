export const createFractions = (fractionsPointsInPercantageDistribution) => {
  // value that makes distribution more random
	const magicValue = Math.round(Math.random() * 100);
	
  const fractionQuantity = fractionsPointsInPercantageDistribution.length + 1;
	let fractions = []

  for (let i = 0; i < fractionQuantity; i++) {
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
    if (fractionQuantity !== 1) {
      if (i === 0) {
        fraction.areaPercentage = fractionsPointsInPercantageDistribution[0];
      } else if (i === fractionQuantity - 1) {
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
        fractions[i - 1].numbers[fractions[i - 1].numbers.length - 1];
    }

    // numbers -> fixed or range
    // drawing numbers
    // FIXED
    if (fraction.isRange === 0) {
      const fixedNumbersQuantity = Math.round(Math.random() * 4 + 1);

      for (let i = 0; i < fixedNumbersQuantity; i++) {
        fraction.numbers.push(
          maxPreviousNumber + Math.round(Math.random() * magicValue) + 1
        );

        // preventing from drawing same number again
        maxPreviousNumber = fraction.numbers[fraction.numbers.length - 1];
      }
      // RANGE
    } else {
      fraction.numbers = [
        maxPreviousNumber + Math.round(Math.random() * magicValue),
        maxPreviousNumber + Math.round(Math.random() * magicValue),
      ];

      while (fraction.numbers[0] === fraction.numbers[1]) {
        fraction.numbers = [
          maxPreviousNumber + Math.round(Math.random() * magicValue),
          maxPreviousNumber + Math.round(Math.random() * magicValue),
        ];
      }
    }
    fraction.numbers.sort((a, b) => a - b);

    fractions.push(fraction);
  }

	return fractions;
};
