export const allSame = (values) => {
	const firstValue = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== firstValue) return false;
  }
  return true;
};
