"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs
    .readFileSync("/Users/sebastianbilandzija/DAY4 Kryha/input5.txt")
    .toString();
var vents = input
    .split("\n")
    .filter(Boolean)
    .map(function (line) {
    var _a = line.split(" -> ").map(function (point) {
        var _a = point.split(",").map(function (value) { return parseInt(value); }), x = _a[0], y = _a[1];
        return { x: x, y: y };
    }), from = _a[0], to = _a[1];
    return {
        from: from,
        to: to
    };
});
var partOne = function () {
    //filter to find only horizontal and vertical vents
    var onlyHV = vents.filter(function (vent) { return vent.from.x === vent.to.x || vent.from.y === vent.to.y; });
    var overlaps = 0;
    //instead of creating the whole model i can create just a whole virtual memory of the points so i dont have to use blank spots
    var memory = new Map();
    function save(location) {
        var content = memory.get(location);
        //console.log(location)
        //check and increment the overlaps when its crosesover
        if (!content) {
            //if not content create one and then increment it
            content = 0;
        }
        content++;
        //not bigger because only once it croses the 2 times its already enough to include it in the count
        if (content === 2) {
            //console.log(location)
            overlaps++;
        }
        memory.set(location, content);
    }
    onlyHV.forEach(function (vent) {
        //check for horizontal for decision
        var isHorizontal = vent.from.y === vent.to.y;
        var currentPoint = { x: vent.from.x, y: vent.from.y };
        // loop to close the gap from current point(start) to finish
        while (currentPoint.x !== vent.to.x || currentPoint.y !== vent.to.y) {
            save([currentPoint.x, currentPoint.y].join(","));
            if (isHorizontal) {
                currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
            }
            else {
                currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
            }
        }
        save([currentPoint.x, currentPoint.y].join(","));
    });
    console.log(overlaps);
};
partOne();
var partTwo = function () {
    var overlaps = 0;
    var memory = new Map();
    function save(location) {
        var content = memory.get(location);
        if (!content) {
            content = 0;
        }
        content++;
        if (content === 2) {
            overlaps++;
        }
        memory.set(location, content);
    }
    vents.forEach(function (vent) {
        var isHorizontal = vent.from.y === vent.to.y;
        var isVertical = vent.from.x === vent.to.x;
        var currentPoint = { x: vent.from.x, y: vent.from.y };
        while (currentPoint.x !== vent.to.x || currentPoint.y !== vent.to.y) {
            save([currentPoint.x, currentPoint.y].join(","));
            if (isHorizontal) {
                currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
            }
            else if (isVertical) {
                currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
            }
            else {
                currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
                currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
            }
        }
        save([currentPoint.x, currentPoint.y].join(","));
    });
    console.log(overlaps);
};
partTwo();
