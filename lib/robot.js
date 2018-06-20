"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateSimpleKey_1 = __importDefault(require("./generateSimpleKey"));
/**
 * A map of turns based on direction.
 * @var {CardinalOrientations} cardinalOrientations
 */
const cardinalOrientations = {
    ["E" /* East */]: {
        ["L" /* Left */]: "N" /* North */,
        ["R" /* Right */]: "S" /* South */,
    },
    ["N" /* North */]: {
        ["L" /* Left */]: "W" /* West */,
        ["R" /* Right */]: "E" /* East */,
    },
    ["S" /* South */]: {
        ["L" /* Left */]: "E" /* East */,
        ["R" /* Right */]: "W" /* West */,
    },
    ["W" /* West */]: {
        ["L" /* Left */]: "S" /* South */,
        ["R" /* Right */]: "N" /* North */,
    },
};
class Robot {
    /**
     * This method creates a new robot and places it on the grid.
     * @param  {Coords} startCoords - Where the robot should start on the grid.
     * @param  {CardinalDirection} - Which direction the robot should initially face.
     */
    constructor(startCoords, startDirection) {
        this.id = generateSimpleKey_1.default();
        this.isLost = false;
        this.coordinates = startCoords;
        this._facing = startDirection;
    }
    get position() {
        return [
            this.coordinates,
            this._facing,
            this.isLost,
        ];
    }
    set position([coordinates, _facing, isLost = false,]) {
        Object.assign(this, {
            coordinates,
            _facing,
            isLost,
        });
    }
    /**
     * @param  {Orientation} orientation - Where the robot should prepare to go.
     * @return {Position} - The result of the would-be move.
     */
    prepare(orientation) {
        const { coordinates, _facing, isLost, } = this;
        if (orientation !== "F" /* Forward */) {
            return [
                coordinates,
                cardinalOrientations[_facing][orientation],
                isLost,
            ];
        }
        let axis;
        let delta;
        switch (_facing) { // @todo DRY this up
            case "E" /* East */:
                axis = "y" /* Y */;
                delta = 1;
                break;
            case "N" /* North */:
                axis = "x" /* X */;
                delta = 1;
                break;
            case "S" /* South */:
                axis = "x" /* X */;
                delta = -1;
                break;
            case "E" /* East */:
                axis = "y" /* Y */;
                delta = -1;
                break;
            default: break;
        }
        return [
            Object.assign({}, coordinates, { [axis]: coordinates[axis] + delta }),
            _facing,
            isLost,
        ];
    }
}
exports.default = Robot;
//# sourceMappingURL=robot.js.map