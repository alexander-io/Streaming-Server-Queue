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
  // width : t_rect.width,
  // height : t_rect.width,
  // width : window_width/2,
  // height : window_width/2,
  fill : 'black'
// }).appendTo(document.getElementById('maze-mount'));
}).appendTo(document.getElementById('body'));


let col = []

let dimension = {
  s:32
}

let block_size = (two.width / 32);
var maze, displayMaze;
var WALL_COLOR = 'rgb(0, 0, 0)';

// var WALL_COLOR = '#484848'
// var PATH_COLOR = 'lime'
var WALK_COLOR = '#484848';
var PATH_COLOR = 'springgreen'
// var PATH_COLOR = 'rgb(150, 30, 190)';

var setColor = function (pos, value) {
  if (value == 1) {
    displayMaze[pos.y][pos.x].fill = WALK_COLOR;
  } else if (value == 2) {
    displayMaze[pos.y][pos.x].fill = PATH_COLOR;
  }
};

let renderMaze = function (maze) {
  displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size*y + (block_size/2), block_size*x + (block_size/2), block_size ,block_size);

      if (maze[x][y] == 0) { // Wall
        spot.fill = WALL_COLOR;
      } else if (maze[x][y] == 1) { // Walkway
        spot.fill = WALK_COLOR;
      } else if (maze[x][y] == 2) { // Solved path
        spot.fill = PATH_COLOR;
      }

      displayRow.push(spot);
    }
    displayMaze.push(displayRow);
  }
  displayMaze[0][0].fill = 'springgreen';
  displayMaze[maze.length - 1][maze.length - 1].fill = 'rgb(111, 111, 111)';
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
