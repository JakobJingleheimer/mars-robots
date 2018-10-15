import { expect } from 'chai';

import Robot from './robot';
import {
	CardinalDirection,
	Coords,
	Movement,
	Position,
} from './';


describe('Robot', () => {
	describe('prop: isLost', () => {
		context('without a grid', () => {
			it('should start out false', () => {
				const robot = new Robot({
					x: 0,
					y: 0,
				}, CardinalDirection.North);

				expect(robot.isLost).to.be.false;
			});
		});
	});

	describe('prop: id', () => {
		it('should be unique', () => {
			const robot1 = new Robot({
				x: 0,
				y: 0,
			}, CardinalDirection.North);
			const robot2 = new Robot({
				x: 0,
				y: 0,
			}, CardinalDirection.North);

			expect(robot1.id).to.not.equal(robot2.id);
		});
	});

	describe('prop: position', () => {
		it('should have the initial data supplied to the constructor', () => {
			const coords: Coords = {
				x: 0,
				y: 0,
			};
			const robot = new Robot(coords, CardinalDirection.North);

			expect(robot.position).to.deep.equal([
				coords,
				CardinalDirection.North,
				false,
			]);
		});

		it('should update with supplied data', () => {
			const robot = new Robot({
				x: 0,
				y: 0,
			}, CardinalDirection.North);

			const newPosition: Position = [
				{
					x: 3,
					y: 4,
				},
				CardinalDirection.South,
				false,
			];

			robot.position = newPosition;

			expect(robot.position).to.deep.equal(newPosition);
		});
	});

	describe('method: prepare', () => {
		function prepareTurn(
			initialOrientation: CardinalDirection,
			movement: Movement,
		): CardinalDirection {
			const robot = new Robot({
				x: 0,
				y: 0,
			}, initialOrientation);

			return robot.prepare(movement)[1];
		}

		it('should return a potential new position based on the robot\'s current position BUT not update its actual position', () => {
			const robot = new Robot({
				x: 0,
				y: 0,
			}, CardinalDirection.North);
			const potentialPosition: Position = robot.prepare(
				Movement.Forward
			);

			expect(potentialPosition).to.deep.equal([
				{
					x: 1,
					y: 0,
				},
				CardinalDirection.North,
				false,
			]);
			expect(robot.position).to.deep.equal([
				{
					x: 0,
					y: 0,
				},
				CardinalDirection.North,
				false,
			]);
		});

		context('when movement is "left"', () => {
			const movement = Movement.Left;

			context('and the starting orientation is North', () => {
				it('should return the orientation "West"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.North,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.West,
					);
				});
			});
			context('and the starting orientation is West', () => {
				it('should return the orientation "South"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.West,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.South,
					);
				});
			});
			context('and the starting orientation is South', () => {
				it('should return the orientation "East"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.South,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.East,
					);
				});
			});
			context('and the starting orientation is East', () => {
				it('should return the orientation "North"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.East,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.North,
					);
				});
			});
		});

		context('when movement is "right"', () => {
			const movement = Movement.Right;

			context('and the starting orientation is North', () => {
				it('should return the orientation "East"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.North,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.East,
					);
				});
			});
			context('and the starting orientation is East', () => {
				it('should return the orientation "South"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.East,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.South,
					);
				});
			});
			context('and the starting orientation is South', () => {
				it('should return the orientation "West"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.South,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.West,
					);
				});
			});
			context('and the starting orientation is West', () => {
				it('should return the orientation "North"', () => {
					const potentialDirection = prepareTurn(
						CardinalDirection.West,
						movement,
					);

					expect(potentialDirection).to.equal(
						CardinalDirection.North,
					);
				});
			});
		});

		context('when movement is "forward"', () => {
			function prepareMove(
				initialOrientation: CardinalDirection,
			): Coords {
				const robot = new Robot({ x: 0, y: 0 }, initialOrientation);

				return robot.prepare(Movement.Forward)[0];
			}

			context('and the starting orientation is North', () => {
				it('should increase "x" by 1', () => {
					const potentialCoords = prepareMove(
						CardinalDirection.North
					);

					expect(potentialCoords.x, 'x').to.equal(1);
					expect(potentialCoords.y, 'y').to.equal(0);
				});
			});

			context('and the starting orientation is East', () => {
				it('should increase "y" by 1', () => {
					const potentialCoords = prepareMove(
						CardinalDirection.East
					);

					expect(potentialCoords.x, 'x').to.equal(0);
					expect(potentialCoords.y, 'y').to.equal(1);
				});
			});

			context('and the starting orientation is West', () => {
				it('should decrease "y" by 1', () => {
					const potentialCoords = prepareMove(
						CardinalDirection.West
					);

					expect(potentialCoords.x, 'x').to.equal(0);
					expect(potentialCoords.y, 'y').to.equal(-1);
				});
			});

			context('and the starting orientation is South', () => {
				it('should decrease "x" by 1', () => {
					const potentialCoords = prepareMove(
						CardinalDirection.South
					);

					expect(potentialCoords.x, 'x').to.equal(-1);
					expect(potentialCoords.y, 'y').to.equal(0);
				});
			});
		});
	});
});
