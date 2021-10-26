const grid = document.querySelector(".grid");
const width = 16;
const movesDisplay = document.getElementById("moves");
let squares = [];
let moves = 0;
let intervalTime = 100; //snake
let speed = 0.8; //snake
let timerId = 0; //snake
let goalIndex = 0; //snake
let direction = 1; //snake

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
];

//create level
function createLevel() {
  //for loop
  for (let i = 0; i < layout.length; i++) {
    //create a square
    const square = document.createElement("div");
    //put square in grid
    grid.append(square);
    //put square in squares array
    squares.push(square);

    if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("goal");
    }
  }
}
createLevel();

// down - 40
// up key - 38
// left - 37
// right - 39

//starting position of player
let playerCurrentIndex = 18;
squares[playerCurrentIndex].classList.add("player");

// If player has reached the goal, vortex away the player
function goalReached() {
  if (squares[playerCurrentIndex].classList.contains("player")) {
    squares[playerCurrentIndex].classList.remove("player");
    //remove the eventListener for the control function
    document.removeEventListener("keyup", control);
    //tell our player they beat the level
    alert("Level cleared!");
  }
}

function move() {
  if (
    (playerCurrentIndex + width >= width * width && direction === width) || //if player has gone out bottom
    (playerCurrentIndex % width === width - 1 && direction === 1) || //if player has gone out right
    (playerCurrentIndex % width === 0 && direction === -1) || //if player has gone out left
    (playerCurrentIndex - width < 0 && direction === -width) || //if player has gone out top
    squares[playerCurrentIndex + direction].classList.contains("player")
  )
    return clearInterval(timerId);

  squares[playerCurrentIndex].classList.add("player");
}

function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}
document.addEventListener("keyup", control);

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
