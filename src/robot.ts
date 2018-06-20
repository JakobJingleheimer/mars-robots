import generateSimpleKey from './generateSimpleKey';

import {
	Axises,
	CardinalOrientations,
	CardinalDirection,
	Coords,
	Orientation,
	Position,
} from './';


const cardinalOrientations: CardinalOrientations = {
	[CardinalDirection.East]: {
		[Orientation.Left]: CardinalDirection.North,
		[Orientation.Right]: CardinalDirection.South,
	},
	[CardinalDirection.North]: {
		[Orientation.Left]: CardinalDirection.West,
		[Orientation.Right]: CardinalDirection.East,
	},
	[CardinalDirection.South]: {
		[Orientation.Left]: CardinalDirection.East,
		[Orientation.Right]: CardinalDirection.West,
	},
	[CardinalDirection.West]: {
		[Orientation.Left]: CardinalDirection.South,
		[Orientation.Right]: CardinalDirection.North,
	},
};

class Robot {
	coordinates: Coords;
	readonly id = generateSimpleKey();
	isLost: boolean = false;
	protected _facing: CardinalDirection;

	constructor(
		startCoords: Coords,
		startDirection: CardinalDirection,
	) {
		this.coordinates = startCoords;
		this._facing = startDirection;
	}

	get facing(): CardinalDirection {
		return this._facing;
	}

	get position(): Position {
		return [
			this.coordinates,
			this._facing,
			this.isLost,
		];
	}

	set position([
		coordinates,
		_facing,
		isLost = false,
	]: Position) {
		Object.assign(this, {
			coordinates,
			_facing,
			isLost,
		});
	}

	prepare(val: Orientation): Position {
		const {
			coordinates,
			_facing,
			isLost,
		} = this;

		if (val !== Orientation.Forward) {
			return [
				coordinates,
				cardinalOrientations[_facing][val],
				isLost,
			];
		}

		let axis: Axises;
		let delta: number;

		switch (_facing) {
			case CardinalDirection.East:
				axis = Axises.Y;
				delta = 1;
				break;
			case CardinalDirection.North:
				axis = Axises.X;
				delta = 1;
				break;
			case CardinalDirection.South:
				axis = Axises.X;
				delta = -1;
				break;
			case CardinalDirection.East:
				axis = Axises.Y;
				delta = -1;
				break;
			default: break;
		}

		return [
			{
				...coordinates,
				[axis]: coordinates[axis] + delta,
			},
			_facing,
			isLost,
		];
	}
}

export default Robot;
