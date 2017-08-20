let window_width = window.innerWidth, window_height = window.innerHeight

let outer = document.getElementById('outer');
let outer_rect = inner.getBoundingClientRect()
// console.log(outer_rect);

let t = document.getElementById('title');
let t_rect = t.getBoundingClientRect()
console.log(t_rect);

var two = new Two({
  fullscreen: false,
  autostart: true,
  width:window_width,
  height:window_height,
  fill : 'black'
}).appendTo(document.getElementById('body'));


let col = []

let dimension = {
  s:64
}

let block_size_width = (two.width/dimension.s)
let block_size_height = (two.height/dimension.s)

var maze, displayMaze;
var WALL_COLOR = '#484848ff';
var WALK_COLOR = '#484848ff';
var PATH_COLOR = 'springgreen'

var setColor = function (pos, value) {
  if (value == 1) {
    displayMaze[pos.y][pos.x].fill = WALK_COLOR;
    displayMaze[pos.y][pos.x].noStroke()
  } else if (value == 2) {
    displayMaze[pos.y][pos.x].fill = PATH_COLOR;
    displayMaze[pos.y][pos.x].noStroke()
  }
};

let renderMaze = function (maze) {
  displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size_width*y + (block_size_width/2), block_size_height*x + (block_size_height/2), block_size_width ,block_size_height);

      if (maze[x][y] == 0) { // Wall
        // XXX: added nostroke and opacity property
        // spot.opacity = .5
        spot.fill = WALL_COLOR;
        spot.noStroke()
        // spot.opacity = .1

        // spot.fill('#00ffffff')

        // spot.noFill()
        // spot.opacity = 0
      } else if (maze[x][y] == 1) { // Walkway
        // XXX: added nostroke and opacity property
        // spot.opacity = .5
        spot.fill = WALK_COLOR;
        spot.noStroke()
        // spot.opacity = .1

        // spot.opacity = .5
        // spot.fill('#00ffffff')
        // spot.noFill()
        // spot.opacity = 0
      } else if (maze[x][y] == 2) { // Solved path
        // spot.fill('#00ffff00')

        spot.fill = PATH_COLOR;
        spot.noStroke()
        // spot.opacity = 1
      }

      displayRow.push(spot);
    }
    displayMaze.push(displayRow);
  }
  displayMaze[0][0].fill = 'springgreen';
  // displayMaze[maze.length - 1][maze.length - 1].fill = 'rgb(111, 111, 111)';
  displayMaze[maze.length - 1][maze.length - 1].fill = 'springgreen';

};

// Kick off the Amazing Maze
solveMaze(maze);

two.bind('update', function() {
  // rect.rotation += 0.001;
  // for (var y = 0; y < displayMaze.length; y++) {
  //   for (var x = 0; x < displayMaze.length; x++) {
  //     if (maze[y][x] == 2) {
  //       displayMaze[x][y].rotation += 0.01;
  //     }
  //   }
  // }
  // displayMaze[0][0].rotation += 0.1;
  // displayMaze[1][1].rotation += 0.05;
  // displayMaze[displayMaze.length - 1][displayMaze.length - 1].rotation += 0.1;
});
