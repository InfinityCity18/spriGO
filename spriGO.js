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
  board[cursor_x][cursor_y] = player_turn; // temp add for mark_dfs, will be deleted if move is illegal
  let opponent_color = player_turn == black ? white : black;
  let adjacent = [];
  legal_adjacent_tiles(cursor_x, cursor_y, adjacent);

  let opponent_map = create_board_arr(board_size[level]);
  let friendly_map = create_board_arr(board_size[level]);
  let to_capture = [];
  let friendly_in_danger = [];
  var opponent_marker = 1;
  var friendly_marker = 1;
  var liberty_opponents = 0;

  for (let i in adjacent) {
    let [x, y] = adjacent[i];
    let type = board[x][y];

    if (type == player_turn) { //is our stone

      if (friendly_map[x][y] != 0) { //was here before
        if (friendly_in_danger.includes(friendly_map[x][y])) {
          friendly_in_danger.push(friendly_map[x][y]);
        }
        continue;
      }

      if (!(mark_dfs(friendly_map, x, y, friendly_marker, player_turn, opponent_color))) {//we have to invert colors, because we are searching for our stones
        friendly_in_danger.push(friendly_marker);
      }
      friendly_marker += 1;
      
    } else if (type == opponent_color) {
      if (opponent_map[x][y] != 0) { //was here before
        continue;
      }

      if (!(mark_dfs(opponent_map, x, y, opponent_marker, opponent_color, player_turn))) {
        //whole string with marker is has no liberties, we can add it to to_capture
        to_capture.push(opponent_marker);
      } else {
        liberty_opponents += 1;
      }
      opponent_marker += 1;

    }
  }

  if (to_capture.length > 0) { //we can capture at least one, so our move is surely legal
    capture(opponent_map, to_capture, opponent_color);
    board[cursor_x][cursor_y] = 0;
    place_piece(cursor_x, cursor_y, player_turn);
    return;
  }
  board[cursor_x][cursor_y] = 0;
  place_piece(cursor_x, cursor_y, player_turn);
  console.log("opponent map: ", opponent_map);
  console.log("friendly_map: ", friendly_map);
  console.log("to_capture :",to_capture);
  console.log("friendly_in_danger :",friendly_in_danger);
  console.log("opponent_marker :", opponent_marker);
  console.log("friendly_marker :", friendly_marker);
  console.log("liberty_opponents :", liberty_opponents);
  console.log(Math.random());
  
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

onInput("k", () => {
  if (board[getFirst(cursor).x][getFirst(cursor).y] == player_turn) {
    return;
  }
  place_piece(getFirst(cursor).x, getFirst(cursor).y, player_turn);
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

function mark_dfs(map, x, y, marker, opponent_color, piece_color) {
  map[x][y] = marker;
  const adjacent = [];
  var has_liberty = false;

  //index bounds check
  legal_adjacent_tiles(x, y, adjacent);

  for (const i in adjacent) {
    const x_loop = adjacent[i][0];
    const y_loop = adjacent[i][1];

    if (map[x_loop][y_loop] != 0) { //this place was visited already
      continue;
    }

    var type = board[x_loop][y_loop];

    if (type == opponent_color) {
      if (mark_dfs(map, x_loop, y_loop, marker, opponent_color, piece_color)) {
        has_liberty = true;
      };
    } else if (type == piece_color) {} else {
      has_liberty = true;
    }
  }

  return has_liberty;
}


function place_piece(x, y, piece_color) {
  addSprite(x, y, piece_color);
  board[x][y] = piece_color;
}

function remove_piece(x, y, piece_color) {
  const sprites = getTile(Number(x), Number(y));
  for (let i in sprites) {
    if (sprites[i].type == piece_color) {
      sprites[i].remove();
      break;
    }
  }
  board[x][y] = 0;
}

function legal_adjacent_tiles(x, y, adjacent) {
  if (x - 1 >= 0) {
    adjacent.push([x - 1, y]);
  }
  if (x + 1 < board_size[level]) {
    adjacent.push([x + 1, y]);
  }
  if (y - 1 >= 0) {
    adjacent.push([x, y - 1]);
  }
  if (y + 1 < board_size[level]) {
    adjacent.push([x, y + 1]);
  }
  return adjacent;
}

function capture(map, to_capture, opponent_color) {
  for (let x in map) {
    for (let y in map[x]) {
      if (to_capture.includes(map[x][y])) {
        remove_piece(x, y, opponent_color);
      }
    }
  }
}
