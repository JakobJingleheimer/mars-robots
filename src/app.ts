import Planet from './planet';
import Robot from './robot';
import {
	CardinalDirection,
	Coords,
	Movement,
	Position,
} from './';

/* ========== Read input ========== */
const instructions = (process.argv[2] || '')
	.split(';')
	.map((set) => set.split('&'));
const gridDimentions = (process.argv[3] || '').split('&');
/* ========== Read input ========== */

const planetInit: Array<(string | Coords)> = ['Mars'];

if (gridDimentions) {
	planetInit[1] = {
		x: parseInt(gridDimentions[0], 10),
		y: parseInt(gridDimentions[1], 10),
	};
}

// @ts-ignore: Microsoft/TypeScript#4130
const mars = new Planet(...planetInit);
const robots: Array<Robot['id']> = Array(instructions.length);

instructions.reduce(
	(list, [ x, y, d, moveList ], i) => {
		const id = list[i] = mars.addRobot(
			{
				x: parseInt(x, 10),
				y: parseInt(y, 10),
			},
			d as CardinalDirection,
		);

		const positions: Position[] = [...moveList]
			.map((m) => mars.moveRobot(
				id,
				m as Movement,
			));
		const [
			coords,
			facing,
			isLost,
		]: Position = positions.pop();

		console.log(
			`${coords.x} ${coords.y} ${facing}${
				isLost
				? ' LOST'
				: ''
			}`,
		);

		return list;
	},
	robots,
);
