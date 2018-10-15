"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const robot_1 = __importDefault(require("./robot"));
describe('Robot', () => {
    describe('prop: isLost', () => {
        context('without a grid', () => {
            it('should start out false', () => {
                const robot = new robot_1.default({
                    x: 0,
                    y: 0,
                }, "N" /* North */);
                chai_1.expect(robot.isLost).to.be.false;
            });
        });
    });
    describe('prop: id', () => {
        it('should be unique', () => {
            const robot1 = new robot_1.default({
                x: 0,
                y: 0,
            }, "N" /* North */);
            const robot2 = new robot_1.default({
                x: 0,
                y: 0,
            }, "N" /* North */);
            chai_1.expect(robot1.id).to.not.equal(robot2.id);
        });
    });
    describe('prop: position', () => {
        it('should have the initial data supplied to the constructor', () => {
            const coords = {
                x: 0,
                y: 0,
            };
            const robot = new robot_1.default(coords, "N" /* North */);
            chai_1.expect(robot.position).to.deep.equal([
                coords,
                "N" /* North */,
                false,
            ]);
        });
        it('should update with supplied data', () => {
            const robot = new robot_1.default({
                x: 0,
                y: 0,
            }, "N" /* North */);
            const newPosition = [
                {
                    x: 3,
                    y: 4,
                },
                "S" /* South */,
                false,
            ];
            robot.position = newPosition;
            chai_1.expect(robot.position).to.deep.equal(newPosition);
        });
    });
    describe('method: prepare', () => {
        function prepareTurn(initialOrientation, movement) {
            const robot = new robot_1.default({
                x: 0,
                y: 0,
            }, initialOrientation);
            return robot.prepare(movement)[1];
        }
        it('should return a potential new position based on the robot\'s current position BUT not update its actual position', () => {
            const robot = new robot_1.default({
                x: 0,
                y: 0,
            }, "N" /* North */);
            const potentialPosition = robot.prepare("F" /* Forward */);
            chai_1.expect(potentialPosition).to.deep.equal([
                {
                    x: 1,
                    y: 0,
                },
                "N" /* North */,
                false,
            ]);
            chai_1.expect(robot.position).to.deep.equal([
                {
                    x: 0,
                    y: 0,
                },
                "N" /* North */,
                false,
            ]);
        });
        context('when movement is "left"', () => {
            const movement = "L" /* Left */;
            context('and the starting orientation is North', () => {
                it('should return the orientation "West"', () => {
                    const potentialDirection = prepareTurn("N" /* North */, movement);
                    chai_1.expect(potentialDirection).to.equal("W" /* West */);
                });
            });
            context('and the starting orientation is West', () => {
                it('should return the orientation "South"', () => {
                    const potentialDirection = prepareTurn("W" /* West */, movement);
                    chai_1.expect(potentialDirection).to.equal("S" /* South */);
                });
            });
            context('and the starting orientation is South', () => {
                it('should return the orientation "East"', () => {
                    const potentialDirection = prepareTurn("S" /* South */, movement);
                    chai_1.expect(potentialDirection).to.equal("E" /* East */);
                });
            });
            context('and the starting orientation is East', () => {
                it('should return the orientation "North"', () => {
                    const potentialDirection = prepareTurn("E" /* East */, movement);
                    chai_1.expect(potentialDirection).to.equal("N" /* North */);
                });
            });
        });
        context('when movement is "right"', () => {
            const movement = "R" /* Right */;
            context('and the starting orientation is North', () => {
                it('should return the orientation "East"', () => {
                    const potentialDirection = prepareTurn("N" /* North */, movement);
                    chai_1.expect(potentialDirection).to.equal("E" /* East */);
                });
            });
            context('and the starting orientation is East', () => {
                it('should return the orientation "South"', () => {
                    const potentialDirection = prepareTurn("E" /* East */, movement);
                    chai_1.expect(potentialDirection).to.equal("S" /* South */);
                });
            });
            context('and the starting orientation is South', () => {
                it('should return the orientation "West"', () => {
                    const potentialDirection = prepareTurn("S" /* South */, movement);
                    chai_1.expect(potentialDirection).to.equal("W" /* West */);
                });
            });
            context('and the starting orientation is West', () => {
                it('should return the orientation "North"', () => {
                    const potentialDirection = prepareTurn("W" /* West */, movement);
                    chai_1.expect(potentialDirection).to.equal("N" /* North */);
                });
            });
        });
        context('when movement is "forward"', () => {
            function prepareMove(initialOrientation) {
                const robot = new robot_1.default({ x: 0, y: 0 }, initialOrientation);
                return robot.prepare("F" /* Forward */)[0];
            }
            context('and the starting orientation is North', () => {
                it('should increase "x" by 1', () => {
                    const potentialCoords = prepareMove("N" /* North */);
                    chai_1.expect(potentialCoords.x, 'x').to.equal(1);
                    chai_1.expect(potentialCoords.y, 'y').to.equal(0);
                });
            });
            context('and the starting orientation is East', () => {
                it('should increase "y" by 1', () => {
                    const potentialCoords = prepareMove("E" /* East */);
                    chai_1.expect(potentialCoords.x, 'x').to.equal(0);
                    chai_1.expect(potentialCoords.y, 'y').to.equal(1);
                });
            });
            context('and the starting orientation is West', () => {
                it('should decrease "y" by 1', () => {
                    const potentialCoords = prepareMove("W" /* West */);
                    chai_1.expect(potentialCoords.x, 'x').to.equal(0);
                    chai_1.expect(potentialCoords.y, 'y').to.equal(-1);
                });
            });
            context('and the starting orientation is South', () => {
                it('should decrease "x" by 1', () => {
                    const potentialCoords = prepareMove("S" /* South */);
                    chai_1.expect(potentialCoords.x, 'x').to.equal(-1);
                    chai_1.expect(potentialCoords.y, 'y').to.equal(0);
                });
            });
        });
    });
});
//# sourceMappingURL=robot.spec.js.map