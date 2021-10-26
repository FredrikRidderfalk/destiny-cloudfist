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
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
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
    } else if (layout[i] === 3) {
      squares[i].classList.add("deep-space");
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
      direction = 0;
      squares[playerCurrentIndex].classList.add("player");

      //give player a cheer
      setTimeout(function () {
        alert(
          `Level cleared in ${moves} moves!🥳🥳🥳🥳🥳 Wow habibi, you're so brilliant, my record was  ${
            moves + 1
          }!😘`
        );
        resetGame();
      }, 10);
    }

    //if the player heads out into deep-space
    if (squares[playerCurrentIndex].classList.contains("deep-space")) {
      squares[playerCurrentIndex].classList.remove("player");
      playerCurrentIndex = playerStartIndex;
      direction = 0;
      squares[playerCurrentIndex].classList.add("player");

      flashingGameBoard();
    }

    // checkForEnteredDeepSpace() here too;
  }, speed);
}

document.addEventListener("keyup", movePlayer);

function resetGame() {
  moves = "";
  movesDisplay.innerHTML = moves;
}

function flashingGameBoard() {
  grid.style.animation = "color_change 1s 2 alternate";
}

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
