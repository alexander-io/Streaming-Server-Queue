var size, maze, start, end, direction, walkways;

// Creates empty row for maze
var createRow = function () {
  var newRow = []
  for (var i = 0; i < size; i++) {
    newRow.push(0);
  }
  return newRow;
};

// Testing purposes
var printMaze = function () {
  for (var i = 0; i < maze.length; i++) {
    var rowString = '';
    for (var j = 0; j < maze.length; j++) {
      rowString += maze[j][i] + '\t';
    }
    console.log(rowString);
  }
  console.log();
};

// Wrapper to recursive maze builder
// The forging algorithm will eventually find the end of the maze,
// but it will chizzle out the rest of the large chunks of wall along the way.
var buildMaze = function () {
  size = 64; // Size of maze

  // Keep track of the number of walkways vs. number of walls
  // walkways = 0;

  // Initialize Maze
  maze = [];
  for (var i = 0; i < size; i++) {
    maze.push(createRow());
  }

  // Initialize start and endpoints
  start = {x: 0, y: 0};
  end = {x: size - 1, y: size - 1};

  // Forge start and endpoints
  updateCoordinate(start, 1);
  updateCoordinate(end, 1);

  // Direction the path is forging (start --> end == true)
  direction = false;

  // Start from the end, forge to the start
  // This makes different directions through the maze more available towards the front
  forgePath(end);

  // CORNER CASE: sometimes the pathForger does not reach the start
  // So, breakthrough until the start is connected to a path
  if (!getCoordinate(rightSpace(start)) && !getCoordinate(downSpace(start))) {
    var nextDown = start;
    while (true) {
      nextDown = downSpace(nextDown);
      updateCoordinate(nextDown, 1);
      // walkways++;
      if (getCoordinate(rightSpace(nextDown) || getCoordinate(downSpace(nextDown)))) {
        break;
      }
    }

    // Then, in case the corner case cut off a GIANT amound of the maze, run the pathForger from start to end
    direction = true;
    forgePath(start);
  }

  return maze;
};

// Explore which path to take
var forgePath = function (pos) {
  // There is forging left to do
  var potentialSpots = findNeighbors(pos);

  while (potentialSpots.length > 0) {
    // Randomly pick from potentialSpots to randomize forging direction
    var index = Math.floor(Math.random()*potentialSpots.length);
    var spot = potentialSpots[index];

    forgeSpot(potentialSpots[index]);

    // Remove spot from the potential spots
    potentialSpots.splice(index, 1);
  }
};

// If possible, forge the given spot/position
var forgeSpot = function (pos) {
  // If we can go here, and we have not been here...
  if (canMove(pos) && !getCoordinate(pos)) {
    updateCoordinate(pos, 1);
    // walkways++;
    forgePath(pos);
  }
};

// Determines whether you can move to the given position
var canMove = function (pos) {
  if (!isValidSpot(pos, size)) {
    return false;
  }
  if (breaksThrough(pos)) {
    return false;
  }
  if (makesWideHall(pos)) {
    return false;
  }
  return true;
};

// Will chizzling out this section of wall break through to another section of the path?
// If it does, the maze becomes too easy to solve...
var breaksThrough = function (pos) {
  var neighbors = findNeighbors(pos);
  var justOne = false; // Only allowed one walkway neighbor
  for (var i = 0; i < neighbors.length; i++) {
    // BASE CASE --> We hit the end (or start) of the maze
    // This is the one time we DO want to break through
    if (direction) {
      if (neighbors[i].x == end.x && neighbors[i].y == end.y) {
        return false;
      }
    } else {
      if (neighbors[i].x == start.x && neighbors[i].y == start.y) {
        return false;
      }
    }

    if (isValidSpot(neighbors[i], size) && getCoordinate(neighbors[i])) {
      if (justOne) {
        return true;
      } else {
        justOne = true;
      }
    }
  }
};

// Does this spot make a wide hall?
// Check for adjacent cartesian "walkways", and then check for the position between them,
// and diagonal to the current position, making a 2x2 square
// 2x2 square is the 'base case' for a wide hall
var makesWideHall = function (pos) {
  var l = leftSpace(pos);
  var ul = upSpace(l);
  var u = rightSpace(ul);
  var ur = rightSpace(u);
  var r = downSpace(ur);
  var rd = downSpace(r);
  var d = leftSpace(rd);
  var dl = leftSpace(d);

  // Check each corner and its adjacent tiles

  if (isValidSpot(l, size) && isValidSpot(ul, size) && isValidSpot(u, size)) {
    if (getCoordinate(l) && getCoordinate(ul) && getCoordinate(u)) {
      return true;
    }
  }

  if (isValidSpot(u, size) && isValidSpot(ur, size) && isValidSpot(r, size, size)) {
    if (getCoordinate(u) && getCoordinate(ur) && getCoordinate(r)) {
      return true;
    }
  }

  if (isValidSpot(r, size) && isValidSpot(rd, size) && isValidSpot(d, size)) {
    if (getCoordinate(r) && getCoordinate(rd) && getCoordinate(d)) {
      return true;
    }
  }

  if (isValidSpot(d, size) && isValidSpot(dl, size) && isValidSpot(l, size)) {
    if (getCoordinate(d) && getCoordinate(dl) && getCoordinate(l)) {
      return true;
    }
  }

  return false;
};
