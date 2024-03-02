export const findMaxValueIndex = (values) => {
  if (values.length === 0) return -1;

  let maxValueIndex = -1;
  let maxValue = values[0];

  for (let i = 1; i < values.length; i++) {
    if (maxValue < values[i]) {
      maxValue = values[i];
      maxValueIndex = i;
    }
  }
  return maxValueIndex;
};
