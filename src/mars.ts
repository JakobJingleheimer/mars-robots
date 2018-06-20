import Robot from './robot';

import {
	CardinalDirection,
	Coords,
	Orientation,
	Position,
} from './';


class Mars {
	protected cliffs: Set<Coords> = new Set();
	readonly edges: Coords;
	protected robots: { [id: string]: Robot } = {};

	constructor(edges: Coords = { x: 50, y: 50 }) {
		this.edges = edges;
	}

	addRobot(
		startCoords: Coords,
		startDirection: CardinalDirection,
	): Robot['id'] {
		const robot = new Robot(startCoords, startDirection);
		const { id } = robot;

		this.robots[id] = robot;

		return id;
	}

	moveRobot(
		robotId: Robot['id'],
		val: Orientation,
	): Position | void {
		const robot = this.robots[robotId];

		if (
			!robot
			|| robot.isLost
		) { return; }

		const { edges } = this;

		const p: Position = robot.prepare(val);
		const [
			coords,
		] = p;

		if (this.cliffs.has(coords)) { return; }

		if (
			coords.x < 0
			|| coords.x > edges.x
			|| coords.y < 0
			|| coords.y > edges.y
		) {
			p[2] = true;
			this.cliffs.add(coords);
		}

		robot.position = p;
	}
}

export default Mars;
