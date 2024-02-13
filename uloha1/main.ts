import { Vector3, calculate } from "./calculate.ts";

const roomSize = promptRoomSize("Rozměr místnosti:");

const start = promptPoint(roomSize, "Bod #1:");
const end = promptPoint(roomSize, "Bod #2:");

const { hoseLength, plumbingLength } = calculate(roomSize, start, end);

console.log(`
Delka potrubi: ${plumbingLength}
Delka hadice: ${hoseLength}
`);

function wrongInput() {
	console.log("\nNespravny vstup.");

	Deno.exit(1);
}

function promptRoomSize(promptMessage: string) {
	const result = Number(prompt(promptMessage));

	if (result <= 0 || Number.isNaN(result)) {
		wrongInput();
	}

	return result;
}

function promptPoint(roomSize: number, promptMessage: string): Vector3 {
	const result = prompt(promptMessage)?.split(/\s/g).map(Number);

	if (
		!result ||
		result.length !== 3 ||
		// nečíselná hodnota souřadnice při zadávání bodů,
		result.some((val) => Number.isNaN(val)) ||
		// bod leží příliš blízko rohu místnosti (za správně zadané považujeme pouze body ležící alespoň 20 od hrany).
		// zadaný bod neleží v žádné stěně/stropu/podlaze,
		result.reduce(
			(count, val) => (val < 20 || val > roomSize - 20 ? count + 1 : count),
			0
		) !== 1
	) {
		return wrongInput() as any;
	}

	return result as Vector3;
}
