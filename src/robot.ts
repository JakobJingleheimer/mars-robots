import generateSimpleKey from './generateSimpleKey';

import {
	Axises,
	CardinalOrientations,
	CardinalDirection,
	Coords,
	Movement,
	Position,
} from './';


/**
 * A map of turns based on direction.
 * @var {CardinalOrientations} cardinalOrientations
 */
const cardinalOrientations: CardinalOrientations = {
	[CardinalDirection.East]: {
		[Movement.Left]: CardinalDirection.North,
		[Movement.Right]: CardinalDirection.South,
	},
	[CardinalDirection.North]: {
		[Movement.Left]: CardinalDirection.West,
		[Movement.Right]: CardinalDirection.East,
	},
	[CardinalDirection.South]: {
		[Movement.Left]: CardinalDirection.East,
		[Movement.Right]: CardinalDirection.West,
	},
	[CardinalDirection.West]: {
		[Movement.Left]: CardinalDirection.South,
		[Movement.Right]: CardinalDirection.North,
	},
};

export default class Robot {
	protected coordinates: Coords;
	readonly id = generateSimpleKey();
	readonly isLost: boolean = false;
	protected _facing: CardinalDirection;

	/**
	 * This method creates a new robot and places it on the grid.
	 * @param  {Coords} startCoords - Where the robot should start on the grid.
	 * @param  {CardinalDirection} - Which direction the robot should initially face.
	 */
	constructor(
		startCoords: Coords,
		startDirection: CardinalDirection,
	) {
		this.coordinates = startCoords;
		this._facing = startDirection;
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

	/**
	 * @param  {Movement} movement - Where the robot should prepare to go.
	 * @return {Position} - The result of the would-be move.
	 */
	prepare(movement: Movement): Position {
		const {
			coordinates,
			_facing,
			isLost,
		} = this;

		if (movement !== Movement.Forward) {
			return [
				coordinates,
				cardinalOrientations[_facing][movement],
				isLost,
			];
		}

		let axis: Axises;
		let delta: number;

		switch (_facing) { // @todo DRY this up
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
			case CardinalDirection.West:
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
