export const enum Orientation {
	Forward = 'F',
	Left = 'L',
	Lost = 'LOST',
	Right = 'R',
}

export const enum CardinalDirection {
	East = 'E',
	North = 'N',
	South = 'S',
	West = 'W',
}

export const enum Axises {
	X = 'x',
	Y = 'y'
}

export type Coords = {
	[a in Axises]: number;
};

export type Position = [
	Coords,
	CardinalDirection,
	boolean
];

export type CardinalOrientations = {
	[cd in CardinalDirection]: {
		[Orientation.Left]: CardinalDirection;
		[Orientation.Right]: CardinalDirection;
	};
};
