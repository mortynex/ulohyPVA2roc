export type Vector3 = [number, number, number];
export type Vector2 = [number, number];

export type Result = {
	plumbingLength: number;
	hoseLength: number;
};

export function calculate(cubeSize: number, start: Vector3, end: Vector3) {
	// check if theres an axis in which both points are on the wall
	const redundantIndex = start.findIndex(
		(_, i) =>
			(start[i] === 0 || start[i] === cubeSize) &&
			(end[i] === 0 || end[i] === cubeSize)
	);

	const onSameWall = start[redundantIndex] === end[redundantIndex];

	if (redundantIndex !== -1) {
		// remove the redundant axis
		start.splice(redundantIndex, 1);
		end.splice(redundantIndex, 1);

		// same side
		if (onSameWall) {
			return formatResult(
				Math.abs(start[0] - end[0]),
				Math.abs(start[1] - end[1])
			);
		}

		// opposite sides
		return calculateOppositeSides(cubeSize, start as any, end as any);
	}

	// neighbouring sides
	return calculateNeighbouringSides(cubeSize, start, end);
}

function calculateNeighbouringSides(
	cubeSize: number,
	start: Vector3,
	end: Vector3
) {
	const isOnWall = (value: number): boolean =>
		value === 0 || value === cubeSize;

	let X = 0;
	let Y = 0;

	for (let i = 0; i < 3; i++) {
		const distanceDiff = Math.abs(start[i] - end[i]);

		if (isOnWall(start[i]) !== isOnWall(end[i])) {
			X += distanceDiff;
		} else {
			Y += distanceDiff;
		}
	}

	return formatResult(X, Y);
}

function calculateOppositeSides(
	cubeSize: number,
	[startX, startY]: Vector2,
	[endX, endY]: Vector2
): Result {
	const xDiff = endX - startX;
	const yDiff = endY - startY;

	// try going around the cube in different directions
	const paths = [
		// -X
		[startX * 2 + xDiff, Math.abs(yDiff)],

		// +X
		[(cubeSize - startX) * 2 - xDiff, Math.abs(yDiff)],

		// -Y
		[startY * 2 + yDiff, Math.abs(xDiff)],

		// +Y
		[(cubeSize - startY) * 2 - yDiff, Math.abs(xDiff)],

		// add cube size to account for the fact that we're going around the cube
	].map(([x, y]) => [x + cubeSize, y]);

	// find shortest plumbing path
	paths.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

	let [plumbingX, plumbingY] = paths[0];

	// find shortest hose path
	paths.sort(
		(a, b) => calculateHoseLength(a[0], a[1]) - calculateHoseLength(b[0], b[1])
	);

	let [hoseX, hoseY] = paths[0];

	return {
		plumbingLength: plumbingX + plumbingY,
		hoseLength: calculateHoseLength(hoseX, hoseY),
	};
}

function calculateHoseLength(x: number, y: number): number {
	return Math.sqrt(x ** 2 + y ** 2);
}

function formatResult(x: number, y: number): Result {
	return { plumbingLength: x + y, hoseLength: calculateHoseLength(x, y) };
}
