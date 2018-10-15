import chai, {
	expect,
} from 'chai';
import {
	createSandbox,
} from 'sinon';
import sinonChai from 'sinon-chai';

import * as Robot from './robot';
import Planet from './planet';

import {
	CardinalDirection,
	Coords,
	Movement,
	Position,
} from './';

chai.use(sinonChai);


describe('Planet', () => {
	const sandbox = createSandbox();
	const ss: any = {};
	const robotTestId = 'abc123';
	const props = {
		id: robotTestId,
		isLost: false,
		position: {
			get() {},
			set() {},
		},
		prepare() {},
	};

	before(() => {
		ss.prepare = sandbox.stub(props, 'prepare');
		ss.positionSetter = sandbox.spy();
		ss.position = sandbox
			.stub(props, 'position')
			.set(ss.positionSetter);

		ss.robot = sandbox
			.stub(Robot, 'default')
			.returns(props);
	});

	afterEach(() => {
		sandbox.resetHistory();
	});

	after(() => {
		sandbox.restore();
	});

	describe('prop: edges', () => {
		it('should set to the initial value supplied to the constructor', () => {
			const planet = new Planet('Test', { x: 49, y: 49 });

			expect(planet.edges.x, 'x').to.equal(49);
			expect(planet.edges.y, 'y').to.equal(49);
		});
	});

	describe('prop: name', () => {
		it('should set to the initial value supplied to the constructor', () => {
			const planet = new Planet('Test', { x: 49, y: 49 });

			expect(planet.name).to.equal('Test');
		});
	});

	describe('method: addRobot', () => {
		it('should create a new robot and add it to the planet', () => {
			const planet = new Planet('Test');
			const coords: Coords = { x: 0, y: 0};
			const orientation: CardinalDirection = CardinalDirection.East;

			planet.addRobot(
				coords,
				orientation,
			);

			expect(ss.robot).to.have.been.calledOnce
				.and.to.have.been.calledWithNew
				.and.to.have.been.calledWith(
					coords,
					orientation,
				);
			expect(planet.robots[robotTestId])
				.to.exist;
		});
	});

	describe('method: moveRobot', () => {
		context('when the robot doesn\'t exist', () => {
			it('should abort', () => {
				const planet = new Planet('Test');

				const output = planet.moveRobot(
					robotTestId,
					Movement.Left,
				);

				expect(output).to.be.undefined;
			});
		});

		context('when the robot becomes lost', () => {
			it('should update the robot\s position', () => {
				const planet = new Planet('Test', { x: 0, y: 0});
				const coords: Coords = { x: 1, y: 1};
				const mockPosition: Position = [
					coords,
					CardinalDirection.East,
					true,
				];

				ss.position.get(() => mockPosition);
				ss.prepare.returns(mockPosition);

				planet.addRobot(
					coords,
					CardinalDirection.East,
				);

				const output = planet.moveRobot(
					robotTestId,
					Movement.Forward,
				);

				expect(output).to.deep.equal(mockPosition);
			});

			it('should add the coordinates to the list of known cliffs', () => {
				const planet = new Planet('Test', { x: 0, y: 0});
				const coords: Coords = { x: 1, y: 1};
				const mockPosition: Position = [
					coords,
					CardinalDirection.East,
					true,
				];

				ss.position.get(() => mockPosition);
				ss.prepare.returns(mockPosition);

				planet.addRobot(
					coords,
					CardinalDirection.East,
				);

				planet.moveRobot(
					robotTestId,
					Movement.Forward,
				);

				expect(planet.cliffs).to.contain(coords);
			});
		});

		context('when the robot is already lost', () => {
			it('should abort with its last known position', () => {
				const planet = new Planet('Test');
				const coords: Coords = { x: 0, y: 0};
				const mockPosition: Position = [
					coords,
					CardinalDirection.East,
					true,
				];

				props.isLost = true;
				ss.position.get(() => mockPosition);

				planet.addRobot(
					coords,
					CardinalDirection.East,
				);

				const output = planet.moveRobot(
					robotTestId,
					Movement.Left,
				);

				expect(output).to.deep.equal(mockPosition);
				props.isLost = false;
			});
		});

		context('when another robot has already become lost at the instructed coordinates', () => {
			it('should abort and return the robot\'s unchanged position', () => {
				const planet = new Planet('Test');
				const coords: Coords = { x: 0, y: 0};
				const mockPosition: Position = [
					coords,
					CardinalDirection.North,
					false,
				];
				sandbox.stub(planet, 'cliffs').value({
					has: () => true,
				});

				ss.position.get(() => mockPosition);
				ss.prepare.returns(mockPosition);

				planet.addRobot(
					coords,
					CardinalDirection.East,
				);

				const output = planet.moveRobot(
					robotTestId,
					Movement.Left,
				);

				expect(ss.positionSetter, 'set robot position').to.not.have.been.called;
				expect(output, 'output').to.deep.equal(mockPosition);
			});
		});

		context('when the robot will not become lost', () => {
			it('should just update the robot\'s position', () => {
				const planet = new Planet('Test');
				const coords: Coords = { x: 0, y: 0};
				const mockPosition: Position = [
					coords,
					CardinalDirection.North,
					false,
				];

				ss.position.get(() => mockPosition);
				ss.prepare.returns(mockPosition);

				planet.addRobot(
					coords,
					CardinalDirection.East,
				);

				const output = planet.moveRobot(
					robotTestId,
					Movement.Left,
				);

				expect(ss.positionSetter).to.have.been.calledWith(mockPosition);
				expect(output).to.deep.equal(mockPosition);
			});
		});
	});
});
