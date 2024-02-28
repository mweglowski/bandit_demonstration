export const drawPoints = (fractionQuantity) => {
	let points = []

	for (let i = 0; i < fractionQuantity - 1; i++) {
		let newPoint = Math.round(Math.random() * 100);

		points.push(newPoint);
	}

	return points;
}