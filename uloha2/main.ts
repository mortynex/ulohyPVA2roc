type Point = [number, number];

const dist = (a: Point, b: Point): number => {
	return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
};

const promptPoint = (promptText: string): Point => {
	const coords = prompt(promptText)?.split(/\s/g).map(Number);

	if (!coords || coords.length !== 2 || coords.some((coord) => isNaN(coord))) {
		throw new Error("Nespravny vstup.");
	}

	return coords as Point;
};

const a = promptPoint("A: ");
const b = promptPoint("B: ");
const c = promptPoint("C: ");

if (
	JSON.stringify(a) === JSON.stringify(b) ||
	JSON.stringify(b) === JSON.stringify(c) ||
	JSON.stringify(a) === JSON.stringify(c)
) {
	throw new Error("Nektere body splyvaji.");
}

let middlePoint: string = "";

if (dist(a, b) + dist(b, c) === dist(a, c)) {
	middlePoint = "B";
} else if (dist(a, c) + dist(c, b) === dist(a, b)) {
	middlePoint = "C";
} else if (dist(b, a) + dist(a, c) === dist(b, c)) {
	middlePoint = "A";
}

if (middlePoint) {
	console.log(`Body lezi na jedne primce.\nProstredni je bod ${middlePoint}.
  `);
} else {
	console.log("Body nelezi na jedne primce.");
}
