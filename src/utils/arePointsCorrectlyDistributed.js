export const arePointsCorrectlyDistributed = (points) => {
	// values have to be sorted before comparing operation
  points.sort((a, b) => a - b);

  // 0 will generate 0% fraction on the left, 100 will generate 0% fraction on the right
  if (points.includes(0) || points.includes(100)) return false;

  // checking if same values occur
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (points[i] === points[j] && i != j) {
        return false;
      }
    }
  }
  return true;
};
