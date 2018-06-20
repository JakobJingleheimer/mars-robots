"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const planet_1 = __importDefault(require("./planet"));
/* ========== Read input ========== */
const instructions = (process.argv[2] || '')
    .split(';')
    .map((set) => set.split('&'));
const gridDimentions = (process.argv[3] || '').split('&');
/* ========== Read input ========== */
const planetInit = ['Mars'];
if (gridDimentions) {
    planetInit[1] = {
        x: parseInt(gridDimentions[0], 10),
        y: parseInt(gridDimentions[1], 10),
    };
}
// @ts-ignore: Microsoft/TypeScript#4130
const mars = new planet_1.default(...planetInit);
const robots = Array(instructions.length);
instructions.reduce((list, [x, y, d, moveList], i) => {
    const id = list[i] = mars.addRobot({
        x: parseInt(x, 10),
        y: parseInt(y, 10),
    }, d);
    const positions = [...moveList]
        .map((m) => mars.moveRobot(id, m));
    const [coords, facing, isLost,] = positions.pop();
    console.log(`${coords.x} ${coords.y} ${facing}${isLost
        ? ' LOST'
        : ''}`);
    return list;
}, robots);
//# sourceMappingURL=app.js.map