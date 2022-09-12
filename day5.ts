import * as fs from "fs";

let input = fs
  .readFileSync("/Users/sebastianbilandzija/DAY4 Kryha/input5.txt")
  .toString();

let vents = input
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [from, to] = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map((value) => parseInt(value));
      return { x, y };
    });
    return {
      from,
      to,
    };
  });

var partOne = function () {
  //filter to find only horizontal and vertical vents
  const onlyHV = vents.filter(
    (vent) => vent.from.x === vent.to.x || vent.from.y === vent.to.y
  );
  let overlaps: number = 0;
  //instead of creating the whole model i can create just a whole virtual memory of the points so i dont have to use blank spots
  const memory: Map<number, number> = new Map();
  function save(location: any) {
    let content = memory.get(location);
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
  onlyHV.forEach((vent) => {
    //check for horizontal for decision
    const isHorizontal = vent.from.y === vent.to.y;
    let currentPoint = { x: vent.from.x, y: vent.from.y };

    // loop to close the gap from current point(start) to finish
    while (currentPoint.x !== vent.to.x || currentPoint.y !== vent.to.y) {
      save([currentPoint.x, currentPoint.y].join(`,`));

      if (isHorizontal) {
        currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
      } else {
        currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
      }
    }
    save([currentPoint.x, currentPoint.y].join(`,`));
  });

  console.log(overlaps);
};

partOne();

var partTwo = function () {
  let overlaps = 0;
  const memory: Map<number, number> = new Map();
  function save(location: any) {
    let content = memory.get(location);
    if (!content) {
      content = 0;
    }
    content++;
    if (content === 2) {
      overlaps++;
    }
    memory.set(location, content);
  }
  vents.forEach((vent) => {
    const isHorizontal = vent.from.y === vent.to.y;
    const isVertical = vent.from.x === vent.to.x;
    let currentPoint = { x: vent.from.x, y: vent.from.y };

    while (currentPoint.x !== vent.to.x || currentPoint.y !== vent.to.y) {
      save([currentPoint.x, currentPoint.y].join(`,`));

      if (isHorizontal) {
        currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
      } else if (isVertical) {
        currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
      } else {
        currentPoint.x += currentPoint.x < vent.to.x ? 1 : -1;
        currentPoint.y += currentPoint.y < vent.to.y ? 1 : -1;
      }
    }
    save([currentPoint.x, currentPoint.y].join(`,`));
  });

  console.log(overlaps);
};

partTwo();
