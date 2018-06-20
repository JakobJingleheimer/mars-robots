"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = __importDefault(require("./robot"));
/**
 * Create a planet and dispatch robots to it!
 */
class Planet {
    /**
     * @param {string} name - The planet's name.
     * @param {Coords} edges - The maximum size of the planet's grid.
     */
    constructor(name, edges = { x: 50, y: 50 }) {
        this.cliffs = new Set();
        this.robots = {};
        this.edges = edges;
        this.name = name;
    }
    /**
     * This method creates a new robot and places it on the grid.
     * @param  {Coords} startCoords - Where the robot should start on the grid.
     * @param  {CardinalDirection} - Which direction the robot should initially face.
     * @return {Robot['id']} - The id of the newly created robot.
     */
    addRobot(startCoords, startDirection) {
        const robot = new robot_1.default(startCoords, startDirection);
        const { id } = robot;
        this.robots[id] = robot;
        return id;
    }
    /**
     * When the robot is lost or would encounter a known "scent", it will ignore the instruction. Otherwise, it obeys.
     * @param  {Robot['id']} robotId - The ID of a robot on the grid.
     * @param  {Orientation} orient - What to do: turn or move forward.
     * @return {Position} - When the instruction was ignored, the current position;
     * otherwise, the new position.
     */
    moveRobot(robotId, orient) {
        const robot = this.robots[robotId];
        if (!robot
            || robot.isLost) {
            return robot.position;
        }
        const { edges } = this;
        const p = robot.prepare(orient);
        const [coords,] = p;
        if (this.cliffs.has(coords)) {
            return robot.position;
        }
        if ( // check if robot is getting "lost"
        coords.x < 0
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