export const calculateExpected = (fractions) => {
  let totalSum = 0;
  Array.from(fractions).forEach((fraction) => {
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

  return Number((totalSum / 100).toFixed(2));
};
