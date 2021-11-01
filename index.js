const grid = document.querySelector(".grid");
const hudText = document.querySelector("#hud-text");
const width = 16;
const movesDisplay = document.getElementById("moves");
// const hero = document.querySelector(".player");
const moveLeftSound = document.getElementById("audio-move-left");
const moveRightSound = document.getElementById("audio-move-right");
const moveUpSound = document.getElementById("audio-move-up");
const moveDownSound = document.getElementById("audio-move-down");
const gameMusic = document.getElementById("game-music");
let count = 0;
const deepSpaceSound = document.getElementById("audio-deep-space");
// const victorySound = document.getElementById("audio-victory");
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
let onLevel6 = false;

gameMusic.loop = true;
gameMusic.volume = 0.08;
moveLeftSound.volume = 0.2;
moveRightSound.volume = 0.2;
moveUpSound.volume = 0.2;
moveDownSound.volume = 0.2;
deepSpaceSound.volume = 0.2;

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
  3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 2, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 3, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
];

// level 3
let layoutLevel3 = [
  3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1, 0, 0,
  1, 1, 1, 0, 1, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 0,
  0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  1, 1, 1, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3,
  3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3,
];

// level 4
let layoutLevel4 = [
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1,
  0, 0, 0, 0, 1, 2, 1, 0, 1, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 3, 3, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 3, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3,
  3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3,
];

// level 5
let layoutLevel5 = [
  1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 3, 1, 0, 0, 0,
  1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 3, 3, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 3, 3, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 1, 0, 0, 0, 0, 3, 3, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 2, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 1, 1,
];

// level 5
let layoutLevel6 = [
  3, 3, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1, 0, 0,
  1, 0, 1, 0, 1, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 1,
  0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 0, 3, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3,
  3, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 1, 3, 3, 3,
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

// play/pause game music
function playPauseMusic() {
  if (count == 0) {
    count = 1;
    gameMusic.play();
  } else {
    count = 0;
    gameMusic.pause();
  }
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
  grid.classList.add("level3");

  // this block sets a new starting position for this level
  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 141;
  playerCurrentIndex = playerStartIndex;
  squares[playerCurrentIndex].classList.add("player");

  onLevel2 = false;
  for (let i = 0; i < layoutLevel3.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel3[i] === 1) {
      squares[i].classList.remove(
        "wall",
        "wallLevel2",
        "goal",
        "goalLevel2",
        "deep-space"
      );
      squares[i].classList.add("wall", "wallLevel3");
    } else if (layoutLevel3[i] === 2) {
      squares[i].classList.remove(
        "wall",
        "wallLevel2",
        "goal",
        "goalLevel2",
        "deep-space"
      );
      squares[i].classList.add("goal", "goalLevel3");
    } else if (layoutLevel3[i] === 3) {
      squares[i].classList.remove(
        "wall",
        "wallLevel2",
        "goal",
        "goalLevel2",
        "deep-space"
      );
      squares[i].classList.add("deep-space");
    } else if (layoutLevel3[i] === 0) {
      squares[i].classList.remove(
        "wall",
        "wallLevel2",
        "goal",
        "goalLevel2",
        "deep-space"
      );
    }
  }
  onLevel3 = true;
}

// create level 4
function createLevel4() {
  grid.classList.add("level4");

  // this block sets a new starting position for this level
  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 225;
  playerCurrentIndex = playerStartIndex;
  squares[playerCurrentIndex].classList.add("player");

  onLevel3 = false;
  for (let i = 0; i < layoutLevel4.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel4[i] === 1) {
      squares[i].classList.remove(
        "wall",
        "wallLevel3",
        "goal",
        "goalLevel3",
        "deep-space"
      );
      squares[i].classList.add("wall", "wallLevel4");
    } else if (layoutLevel4[i] === 2) {
      squares[i].classList.remove(
        "wall",
        "wallLevel3",
        "goal",
        "goalLevel3",
        "deep-space"
      );
      squares[i].classList.add("goal", "goalLevel4");
    } else if (layoutLevel4[i] === 3) {
      squares[i].classList.remove(
        "wall",
        "wallLevel3",
        "goal",
        "goalLevel3",
        "deep-space"
      );
      squares[i].classList.add("deep-space");
    } else if (layoutLevel4[i] === 0) {
      squares[i].classList.remove(
        "wall",
        "wallLevel3",
        "goal",
        "goalLevel3",
        "deep-space"
      );
    }
  }
  onLevel4 = true;
}

// create level 5
function createLevel5() {
  grid.classList.add("level5");

  // this block sets a new starting position for this level
  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 17;
  playerCurrentIndex = playerStartIndex;
  squares[playerCurrentIndex].classList.add("player");

  onLevel4 = false;
  for (let i = 0; i < layoutLevel5.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel5[i] === 1) {
      squares[i].classList.remove(
        "wall",
        "wallLevel4",
        "goal",
        "goalLevel4",
        "deep-space"
      );
      squares[i].classList.add("wall", "wallLevel5");
    } else if (layoutLevel5[i] === 2) {
      squares[i].classList.remove(
        "wall",
        "wallLevel4",
        "goal",
        "goalLevel4",
        "deep-space"
      );
      squares[i].classList.add("goal", "goalLevel5");
    } else if (layoutLevel5[i] === 3) {
      squares[i].classList.remove(
        "wall",
        "wallLevel4",
        "goal",
        "goalLevel4",
        "deep-space"
      );
      squares[i].classList.add("deep-space");
    } else if (layoutLevel5[i] === 0) {
      squares[i].classList.remove(
        "wall",
        "wallLevel4",
        "goal",
        "goalLevel4",
        "deep-space"
      );
    }
  }
  onLevel5 = true;
}

// create level 6
function createLevel6() {
  grid.classList.add("level6");

  // this block sets a new starting position for this level
  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 18;
  playerCurrentIndex = playerStartIndex;
  squares[playerCurrentIndex].classList.add("player");

  onLevel5 = false;
  for (let i = 0; i < layoutLevel6.length; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);

    if (layoutLevel6[i] === 1) {
      squares[i].classList.remove(
        "wall",
        "wallLevel5",
        "goal",
        "goalLevel5",
        "deep-space"
      );
      squares[i].classList.add("wall", "wallLevel6");
    } else if (layoutLevel6[i] === 2) {
      squares[i].classList.remove(
        "wall",
        "wallLevel5",
        "goal",
        "goalLevel5",
        "deep-space"
      );
      squares[i].classList.add("goal", "goalLevel6");
    } else if (layoutLevel6[i] === 3) {
      squares[i].classList.remove(
        "wall",
        "wallLevel5",
        "goal",
        "goalLevel5",
        "deep-space"
      );
      squares[i].classList.add("deep-space");
    } else if (layoutLevel6[i] === 0) {
      squares[i].classList.remove(
        "wall",
        "wallLevel5",
        "goal",
        "goalLevel5",
        "deep-space"
      );
    }
  }
  onLevel6 = true;
}

// create victory screen
function createVictoryScreen() {
  grid.classList.add("victory-screen");

  squares[playerCurrentIndex].classList.remove("player");
  playerStartIndex = 300;
  playerCurrentIndex = playerStartIndex;

  for (let i = 0; i < layoutLevel6.length; i++) {
    if (layoutLevel6[i] === 1) {
      squares[i].classList.remove(
        "wall",
        "wallLevel6",
        "goal",
        "goalLevel6",
        "deep-space",
        "player"
      );
    } else if (layoutLevel6[i] === 2) {
      squares[i].classList.remove(
        "wall",
        "wallLevel6",
        "goal",
        "goalLevel6",
        "deep-space",
        "player"
      );
    } else if (layoutLevel6[i] === 3) {
      squares[i].classList.remove(
        "wall",
        "wallLevel6",
        "goal",
        "goalLevel6",
        "deep-space",
        "player"
      );
    } else if (layoutLevel5[i] === 0) {
      squares[i].classList.remove(
        "wall",
        "wallLevel6",
        "goal",
        "goalLevel6",
        "deep-space",
        "player"
      );
    }
  }
  document.removeEventListener("keyup", movePlayer);
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
      moveRightSound.play();
    }
  } else if (e.keyCode === 38) {
    direction = -width;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
      moveUpSound.play();
    }
  } else if (e.keyCode === 37) {
    direction = -1;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
      moveLeftSound.play();
    }
  } else if (e.keyCode === 40) {
    direction = +width;
    if (!squares[playerCurrentIndex + direction].classList.contains("wall")) {
      moves++;
      moveDownSound.play();
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

      // victorySound.play();

      //give player a cheer
      // setTimeout(function () {
      //   alert(`Level cleared in ${moves} moves!🥳🥳🥳🥳🥳`);
      // }, 50);
      resetGame();

      if (onLevel1) {
        createLevel2();
      } else if (onLevel2) {
        createLevel3();
      } else if (onLevel3) {
        createLevel4();
      } else if (onLevel4) {
        createLevel5();
      } else if (onLevel5) {
        createLevel6();
      } else if (onLevel6) {
        createVictoryScreen();
      }
    }

    //if the player heads out into deep-space
    if (squares[playerCurrentIndex].classList.contains("deep-space")) {
      squares[playerCurrentIndex].classList.remove("player");
      playerCurrentIndex = playerStartIndex;
      direction = 0;
      squares[playerCurrentIndex].classList.add("player");

      deepSpaceSound.play();

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
