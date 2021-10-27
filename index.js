const grid = document.querySelector(".grid");
const hudText = document.querySelector("#hud-text");
const width = 16;
const movesDisplay = document.getElementById("moves");
let squares = [];
let moves = 0;
let speed = 25;
let direction = 0;

let timerId = NaN;
let goalIndex = 0;
let playerStartIndex = 52;

let onLevel1 = false;
let onLevel2 = false;
let onLevel3 = false;
let onLevel4 = false;
let onLevel5 = false;

// level 1
let layout = [
  3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
];

// level 2
let layoutLevel2 = [
  3, 3, 3, 3, 1, 1, 0, 0, 0, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
];

// level 3
let layoutLevel3 = [
  3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 2, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
];

// level 4
let layoutLevel4 = [
  3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
];

// level 5
let layoutLevel5 = [
  3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
];

// loads intro screen
function loadsIntro() {
  grid.classList.remove("grid");
  grid.classList.add("aang-meditating");

  setTimeout(function () {
    grid.classList.remove("aang-meditating");
    grid.classList.add("aang-avatar-state");
  }, 4000);

  setTimeout(function () {
    grid.classList.remove("aang-avatar-state");
    grid.classList.add("grid");
  }, 8000);
}

//create level
function createLevel() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("goal");
    } else if (layout[i] === 3) {
      squares[i].classList.add("deep-space");
    }
  }
  onLevel1 = true;
}
createLevel();

// create level 2
function createLevel2() {
  grid.classList.add("level2");

  // this block sets a new starting position for this level
  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 21;
  playerCurrentIndex = playerStartIndex;
  squares[playerCurrentIndex].classList.add("player");

  onLevel1 = false;
  for (let i = 0; i < layoutLevel2.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel2[i] === 1) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("wall", "wallLevel2");
    } else if (layoutLevel2[i] === 2) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("goal", "goalLevel2");
    } else if (layoutLevel2[i] === 3) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("deep-space");
    } else if (layoutLevel2[i] === 0) {
      squares[i].classList.remove("wall", "goal", "deep-space");
    }
  }
  onLevel2 = true;
}

// create level 3
function createLevel3() {
  onLevel2 = false;
  for (let i = 0; i < layoutLevel3.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel3[i] === 1) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("wall");
    } else if (layoutLevel3[i] === 2) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("goal");
    } else if (layoutLevel3[i] === 3) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("deep-space");
    } else if (layoutLevel3[i] === 0) {
      squares[i].classList.remove("wall", "goal", "deep-space");
    }
  }
  onLevel3 = true;
}

// create level 4
function createLevel4() {
  onLevel3 = false;
  for (let i = 0; i < layoutLevel4.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel4[i] === 1) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("wall");
    } else if (layoutLevel4[i] === 2) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("goal");
    } else if (layoutLevel4[i] === 3) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("deep-space");
    } else if (layoutLevel4[i] === 0) {
      squares[i].classList.remove("wall", "goal", "deep-space");
    }
  }
  onLevel4 = true;
}

// create level 5
function createLevel5() {
  onLevel4 = false;
  for (let i = 0; i < layoutLevel5.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel5[i] === 1) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("wall");
    } else if (layoutLevel5[i] === 2) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("goal");
    } else if (layoutLevel5[i] === 3) {
      squares[i].classList.remove("wall", "goal", "deep-space");
      squares[i].classList.add("deep-space");
    } else if (layoutLevel5[i] === 0) {
      squares[i].classList.remove("wall", "goal", "deep-space");
    }
  }
  onLevel5 = true;
}

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
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
    }
  } else if (e.keyCode === 38) {
    direction = -width;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
    }
  } else if (e.keyCode === 37) {
    direction = -1;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
    }
  } else if (e.keyCode === 40) {
    direction = +width;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
    }
  }
  // moves++;
  movesDisplay.innerHTML = `Moves: ${moves}`;
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
        alert(`Level cleared in ${moves} moves!🥳🥳🥳🥳🥳`);
      }, 50);
      resetGame();

      if (onLevel1) {
        createLevel2();
      } else if (onLevel2) {
        createLevel3();
      } else if (onLevel3) {
        createLevel4();
      } else if (onLevel4) {
        createLevel5();
      }
    }

    //if the player heads out into deep-space
    if (squares[playerCurrentIndex].classList.contains("deep-space")) {
      squares[playerCurrentIndex].classList.remove("player");
      playerCurrentIndex = playerStartIndex;
      direction = 0;
      squares[playerCurrentIndex].classList.add("player");

      flashingGameBoard();

      setTimeout(function () {
        grid.classList.remove("in-space");
        resetGame();
      }, 400);
    }
  }, speed);
}

document.addEventListener("keyup", movePlayer);

function resetGame() {
  moves = "";
  movesDisplay.innerHTML = moves;
  // hudText = "";
}

function flashingGameBoard() {
  grid.classList.add("in-space");
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
