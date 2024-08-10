/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: spriGO
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const white = "w"
const black = "b"
const cross = "0"
const lt_corner = "1"
const rt_corner = "2"
const lb_corner = "3"
const rb_corner = "4"
const l_pipe = "5"
const r_pipe = "6"
const t_bar = "7"
const b_bar = "8"
const bg = "9"
const cursor = "c"

setLegend(
  [black, bitmap`
................
....00000000....
...0000000000...
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.L000000000000L.
..L0000000000L..
...L00000000L...
....LLLLLLLL....
................`],
  [white, bitmap`
................
....22222222....
...2222222222...
..222222222222..
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.L222222222222L.
..L2222222222L..
...L22222222L...
....LLLLLLLL....
................`],
  [cursor, bitmap`
555..........555
55............55
5..............5
................
................
................
................
................
................
................
................
................
................
5..............5
55............55
555..........555`],
  [cross, bitmap`
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
3333333003333333
0000000000000000
0000000000000000
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC`],
  [lt_corner, bitmap`
................
................
................
................
................
................
................
.......000000000
.......000000000
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC`],
  [rt_corner, bitmap`
................
................
................
................
................
................
................
000000000.......
000000000.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......`],
  [lb_corner, bitmap`
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......003333333
.......000000000
.......000000000
................
................
................
................
................
................
................`],
  [rb_corner, bitmap`
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
333333300.......
000000000.......
000000000.......
................
................
................
................
................
................
................`],
  [l_pipe, bitmap`
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......003333333
.......000000000
.......000000000
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC
.......00CCCCCCC`],
  [r_pipe, bitmap`
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
333333300.......
000000000.......
000000000.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......
CCCCCC300.......`],
  [t_bar, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC`],
  [b_bar, bitmap`
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
CCCCCC300CCCCCCC
3333333003333333
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [bg, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]

)

const boards = [
  map`
177777772
500000006
500000006
500000006
500000006
500000006
500000006
500000006
388888884`, //9x9
  map`
1777777777772
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
5000000000006
3888888888884`, //13x13
  map`
1777777777777777772
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
5000000000000000006
3888888888888888884` //19x19
]

//selectable board sizes
const board_size = [9, 13, 19];

setSolids([])

let level = 0
let player_turn = black; //black starts

setMap(boards[level])

//0 means empty, b means black stone, w means white stone
let board = create_board_arr(board_size[level]);

setBackground(bg)

setPushables({})

addSprite(8, 8, black);
addSprite(3, 6, white);
addSprite(5, 2, white);
addSprite(5, 4, cursor);


afterInput(() => {})

onInput("j", () => {
  const [cursor_x, cursor_y] = get_cursor_pos();
  if (board[cursor_x][cursor_y] != 0) {
    return;
  }
  board[cursor_x][cursor_y] = player_turn; // temp add for mark_dfs
  let opponent_color = player_turn == black ? white : black;

  

  addSprite(cursor_x, cursor_y, player_turn);
  board[cursor_x][cursor_y] = player_turn;
  
})

onInput("s", () => {
  getFirst(cursor).y += 1
})

onInput("w", () => {
  getFirst(cursor).y -= 1
})

onInput("a", () => {
  getFirst(cursor).x -= 1
})

onInput("d", () => {
  getFirst(cursor).x += 1
})

onInput("i", () => {
  remove_piece(getFirst(cursor).x, getFirst(cursor).y, player_turn);
})

onInput("l", () => {
  if (player_turn == black) {
    player_turn = white;
  } else {
    player_turn = black;
  }
})

function create_board_arr(size) {
  let arr = []

  for (let i = 0; i < size; i++) {
    let column = []
    for (let j = 0; j < size; j++) {
      column.push(0)
    }
    arr.push(column)
  }

  return arr;
}

function get_cursor_pos() {
  return [getFirst(cursor).x, getFirst(cursor).y];
}

function mark_dfs(map, x, y, marker, opponent_color) {
  const adjacent = []
  var has_liberty = false;
  if (x-1 >= 0) {
    adjacent.push([x-1, y]);
  }
  if (x+1 < board_size[level]) {
    adjacent.push([x+1, y]);
  }
  if (y-1 >= 0) {
    adjacent.push([x, y-1]);
  }
  if (y+1 < board_size[level]) {
    adjacent.push([x, y+1]);
  }

  for (const [x, y] in adjacent) {
    
  }
}


function place_piece(x,y,color) {
  addSprite(x,y,color);
  board[x][y] = color;
}

function remove_piece(x,y,color) {
  const sprites = getTile(x,y);
  console.log(sprites, x, y, color);
  for (let i in sprites) {
    if (sprites[i].type == color) {
      sprites[i].remove();
      break;
    }
  }
  board[x][y] = 0;
}


function is_allowed_to_be_placed(x,y,color) {

}
