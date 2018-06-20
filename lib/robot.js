"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateSimpleKey_1 = __importDefault(require("./generateSimpleKey"));
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
    constructor(startCoords, startDirection) {
        this.id = generateSimpleKey_1.default();
        this.isLost = false;
        this.coordinates = startCoords;
        this._facing = startDirection;
    }
    get facing() {
        return this._facing;
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
    prepare(val) {
        const { coordinates, _facing, isLost, } = this;
        if (val !== "F" /* Forward */) {
            return [
                coordinates,
                cardinalOrientations[_facing][val],
                isLost,
            ];
        }
        let axis;
        let delta;
        switch (_facing) {
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