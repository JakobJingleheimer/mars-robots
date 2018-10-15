"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = __importDefault(require("./robot"));
/**
 * Create a planet and dispatch robots to it!
 * @property {Hashmap} cliffs - A hashmap of known sposts where robots become lost, keyed by $x.$y
 * in order to ensure a time complexity of O(1).
 * @property {Coords} edges - The bounds of the planet's grid.
 * @property {string} name - The planet's name.
 * @property {Hashmap} robots - A collection of robots on the planet.
 */
class Planet {
    /**
     * @param {string} name - The planet's name.
     * @param {Coords} edges - The maximum size of the planet's grid.
     */
    constructor(name, edges = { x: 50, y: 50 }) {
        this.cliffs = {};
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
     * @param  {Movement} move - What to do: turn or move forward.
     * @return {Position} - When the instruction was ignored, the current position;
     * otherwise, the new position.
     */
    moveRobot(robotId, move) {
        const robot = this.robots[robotId];
        if (!robot)
            return void 0;
        if (robot.isLost)
            return robot.position;
        const { edges } = this;
        const p = robot.prepare(move);
        const [coords,] = p;
        const cliffKey = `${coords.x}.${coords.y}`;
        if (this.cliffs[cliffKey]) {
            return robot.position;
        }
        if ( // check if robot is getting "lost"
        coords.x < 0
            || coords.x > edges.x
            || coords.y < 0
            || coords.y > edges.y) {
            p[2] = true;
            this.cliffs[cliffKey] = true;
        }
        robot.position = p;
        return robot.position;
    }
}
exports.default = Planet;
//# sourceMappingURL=planet.js.map