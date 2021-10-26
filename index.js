const grid = document.querySelector(".grid");
const width = 16;
const movesDisplay = document.getElementById("moves");
let squares = [];
let moves = 0;
let speed = 30;

let timerId = NaN;
let goalIndex = 0;
// let direction = 0;
let playerStartIndex = 52;

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
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
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

//starting position of player
let playerCurrentIndex = playerStartIndex;
squares[playerCurrentIndex].classList.add("player");

// right - 39
// up - 38
// left - 37
// down - 40

function movePlayer(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
  moves++;
  movesDisplay.innerHTML = moves;
  clearInterval(timerId);

  timerId = setInterval(function () {
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      squares[playerCurrentIndex].classList.remove("player");
      playerCurrentIndex += direction;
      squares[playerCurrentIndex].classList.add("player");
    }

    //if the player reaches the goal
    if (squares[playerCurrentIndex].classList.contains("goal")) {
      squares[playerCurrentIndex].classList.remove("player");
      playerCurrentIndex = playerStartIndex;
      squares[playerCurrentIndex].classList.add("player");

      //give player a cheer
      setTimeout(function () {
        alert(`Level cleared in ${moves} moves!🥳🥳🥳🥳🥳`);
      }, 10);
      return (moves = 0);
    }
    // checkForEnteredDeepSpace() here too;
  }, speed);
}

document.addEventListener("keyup", movePlayer);

// this code prevents the window from scrolling around when pressing buttons in the game
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
