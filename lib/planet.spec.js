"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const sinon_1 = require("sinon");
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const Robot = __importStar(require("./robot"));
const planet_1 = __importDefault(require("./planet"));
chai_1.default.use(sinon_chai_1.default);
describe('Planet', () => {
    const sandbox = sinon_1.createSandbox();
    const ss = {};
    const robotTestId = 'abc123';
    const props = {
        id: robotTestId,
        isLost: false,
        position: {
            get() { },
            set() { },
        },
        prepare() { },
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
            const planet = new planet_1.default('Test', { x: 49, y: 49 });
            chai_1.expect(planet.edges.x, 'x').to.equal(49);
            chai_1.expect(planet.edges.y, 'y').to.equal(49);
        });
    });
    describe('prop: name', () => {
        it('should set to the initial value supplied to the constructor', () => {
            const planet = new planet_1.default('Test', { x: 49, y: 49 });
            chai_1.expect(planet.name).to.equal('Test');
        });
    });
    describe('method: addRobot', () => {
        it('should create a new robot and add it to the planet', () => {
            const planet = new planet_1.default('Test');
            const coords = { x: 0, y: 0 };
            const orientation = "E" /* East */;
            planet.addRobot(coords, orientation);
            chai_1.expect(ss.robot).to.have.been.calledOnce
                .and.to.have.been.calledWithNew
                .and.to.have.been.calledWith(coords, orientation);
            chai_1.expect(planet.robots[robotTestId])
                .to.exist;
        });
    });
    describe('method: moveRobot', () => {
        context('when the robot doesn\'t exist', () => {
            it('should abort', () => {
                const planet = new planet_1.default('Test');
                const output = planet.moveRobot(robotTestId, "L" /* Left */);
                chai_1.expect(output).to.be.undefined;
            });
        });
        context('when the robot becomes lost', () => {
            it('should update the robot\s position', () => {
                const planet = new planet_1.default('Test', { x: 0, y: 0 });
                const coords = { x: 1, y: 1 };
                const mockPosition = [
                    coords,
                    "E" /* East */,
                    true,
                ];
                ss.position.get(() => mockPosition);
                ss.prepare.returns(mockPosition);
                planet.addRobot(coords, "E" /* East */);
                const output = planet.moveRobot(robotTestId, "F" /* Forward */);
                chai_1.expect(output).to.deep.equal(mockPosition);
            });
            it('should add the coordinates to the list of known cliffs', () => {
                const planet = new planet_1.default('Test', { x: 0, y: 0 });
                const coords = { x: 1, y: 1 };
                const mockPosition = [
                    coords,
                    "E" /* East */,
                    true,
                ];
                ss.position.get(() => mockPosition);
                ss.prepare.returns(mockPosition);
                planet.addRobot(coords, "E" /* East */);
                planet.moveRobot(robotTestId, "F" /* Forward */);
                chai_1.expect(planet.cliffs[`${coords.x}.${coords.y}`]).to.be.true;
            });
        });
        context('when the robot is already lost', () => {
            it('should abort with its last known position', () => {
                const planet = new planet_1.default('Test');
                const coords = { x: 0, y: 0 };
                const mockPosition = [
                    coords,
                    "E" /* East */,
                    true,
                ];
                props.isLost = true;
                ss.position.get(() => mockPosition);
                planet.addRobot(coords, "E" /* East */);
                const output = planet.moveRobot(robotTestId, "L" /* Left */);
                chai_1.expect(output).to.deep.equal(mockPosition);
                props.isLost = false;
            });
        });
        context('when another robot has already become lost at the instructed coordinates', () => {
            it('should abort and return the robot\'s unchanged position', () => {
                const planet = new planet_1.default('Test');
                const coords = { x: 0, y: 0 };
                const mockPosition = [
                    coords,
                    "N" /* North */,
                    false,
                ];
                sandbox.stub(planet, 'cliffs').value({
                    '0.0': true,
                });
                ss.position.get(() => mockPosition);
                ss.prepare.returns(mockPosition);
                planet.addRobot(coords, "E" /* East */);
                const output = planet.moveRobot(robotTestId, "L" /* Left */);
                chai_1.expect(ss.positionSetter, 'set robot position').to.not.have.been.called;
                chai_1.expect(output, 'output').to.deep.equal(mockPosition);
            });
        });
        context('when the robot will not become lost', () => {
            it('should just update the robot\'s position', () => {
                const planet = new planet_1.default('Test');
                const coords = { x: 0, y: 0 };
                const mockPosition = [
                    coords,
                    "N" /* North */,
                    false,
                ];
                ss.position.get(() => mockPosition);
                ss.prepare.returns(mockPosition);
                planet.addRobot(coords, "E" /* East */);
                const output = planet.moveRobot(robotTestId, "L" /* Left */);
                chai_1.expect(ss.positionSetter).to.have.been.calledWith(mockPosition);
                chai_1.expect(output).to.deep.equal(mockPosition);
            });
        });
    });
});
//# sourceMappingURL=planet.spec.js.map