export const enum Axises {
	X = 'x',
	Y = 'y'
}

export const enum CardinalDirection {
	East = 'E',
	North = 'N',
	South = 'S',
	West = 'W',
}

export type Coords = {
	[a in Axises]: number;
};

export const enum Movement {
	Forward = 'F',
	Left = 'L',
	Right = 'R',
}

export type Position = [
	Coords,
	CardinalDirection,
	boolean
];

export type CardinalOrientations = {
	[cd in CardinalDirection]: {
		[Movement.Left]: CardinalDirection;
		[Movement.Right]: CardinalDirection;
	};
};
