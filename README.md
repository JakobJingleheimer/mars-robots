# Robots on Mars!

To run the programme, run the following command:

```sh
node lib/app.js $robot_input $grid_dimensions?
```
```sh
node lib/app.js "1&1&E&RFRFRFRF;3&2&N&FRRFLLFFRRFLL" "3&3"
```

## `robot_instructions`

Sets are delimited by `;` and items within the set are delimited by `&`.

ex

```sh
"1&1&E&RFRFRFRF;3&2&N&FRRFLLFFRRFLL"
```

A robot will be generated for each set of instructions supplied.

If a robot becomes lost whist following instructions, the planet will stop moving it, and report the robot's last position.

If a robot receives a comand that is known to cause robots to become lost, it will skip that instruction and continue to the next.

## `grid_dimensions`

(Optional) X and Y maximums delimited by `&`. Use this to shrink the max size of the planet (more likely for robots to become lost), or to make the planet bigger.

ex

```sh
"3&3"
```