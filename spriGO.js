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
const cross = "c"
const lt_corner = "l"
const rt_corner = "r"
const lb_corner = "o"
const rb_corner = "p"
const l_pipe = "i"
const r_pipe = "u"
const t_bar = "t"
const b_bar = "k"
const bg = "0"

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

setSolids([])

let level = 0
const boards = [
  map`
ltttttttr
icccccccu
icccccccu
icccccccu
icccccccu
icccccccu
icccccccu
icccccccu
okkkkkkkp`,
  map`
ltttttttttttr
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
icccccccccccu
okkkkkkkkkkkp`,
  map`
ltttttttttttttttttr
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
icccccccccccccccccu
okkkkkkkkkkkkkkkkkp`
]

setMap(boards[level])
setBackground(bg)

setPushables({
  [ black ]: []
})

addSprite(2,6, black);
addSprite(3,6, white);
addSprite(5,3, white);

onInput("s", () => {
  getFirst(black).y += 1
})

afterInput(() => {
  
})
