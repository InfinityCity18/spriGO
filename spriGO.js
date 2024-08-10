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
  [ black, bitmap`
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
................` ],
  [ white, bitmap`
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
  [ cursor, bitmap`
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
  [ cross, bitmap`
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
  [ lt_corner, bitmap`
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
  [ rt_corner, bitmap`
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
  [ lb_corner, bitmap`
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
  [ rb_corner, bitmap`
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
  [ l_pipe, bitmap`
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
  [ r_pipe, bitmap`
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
  [ t_bar, bitmap`
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
  [ b_bar, bitmap`
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
  [ bg, bitmap`
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

setMap(boards[level])
let board = create_board_arr(board_size[level]);

setBackground(bg)

setPushables({
})

addSprite(8,8, black);
addSprite(3,6, white);
addSprite(5,2, white);
addSprite(5,4, cursor);

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

console.log(getFirst(cursor));

afterInput(() => {
})

onInput("j", () => {
  const [cursor_x, cursor_y] = get_cursor_pos();
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

