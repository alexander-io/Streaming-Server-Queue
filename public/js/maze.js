testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    		       'BlackBerry|Windows Phone|'  +
    		       'Opera Mini|IEMobile|Mobile' ,
    		      'i');

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
// let block_size_height = block_size_width

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
      } else if (maze[x][y] == 1) { // Walkway
        spot.fill = WALK_COLOR;
        spot.noStroke()
      } else if (maze[x][y] == 2) { // Solved path
        spot.fill = PATH_COLOR;
        spot.noStroke()
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

if (testExp.test(navigator.userAgent)) {
  // mobile
  console.log('mobile');
} else {
  // browser
  console.log('browser');
  solveMaze(maze);

}
