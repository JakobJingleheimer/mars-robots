"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = __importDefault(require("./robot"));
class Planet {
    constructor(name, edges = { x: 50, y: 50 }) {
        this.cliffs = new Set();
        this.robots = {};
        this.edges = edges;
        this.name = name;
    }
    addRobot(startCoords, startDirection) {
        const robot = new robot_1.default(startCoords, startDirection);
        const { id } = robot;
        this.robots[id] = robot;
        return id;
    }
    moveRobot(robotId, val) {
        const robot = this.robots[robotId];
        if (!robot
            || robot.isLost) {
            return;
        }
        const { edges } = this;
        const p = robot.prepare(val);
        const [coords,] = p;
        if (this.cliffs.has(coords)) {
            return;
        }
        if (coords.x < 0
            || coords.x > edges.x
            || coords.y < 0
            || coords.y > edges.y) {
            p[2] = true;
            this.cliffs.add(coords);
        }
        robot.position = p;
        return robot.position;
    }
}
exports.default = Planet;
//# sourceMappingURL=planet.js.map