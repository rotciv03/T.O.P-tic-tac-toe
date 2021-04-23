let root1 = document.querySelector(".root1");
let gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container");
root1.appendChild(gridContainer);
let winningText = document.querySelector(".winning-text");
let winningMessage = document.querySelector(".winning-message");
let restartBtn = document.getElementById("restart-btn");

let X_CLASS = "x";
let CIRCLE_CLASS = "circle";
let WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let grid = Array.apply(null, Array(9));
let xTurn;

grid.forEach((el, index) => {
  grid[index] = false;
  let square = document.createElement("div");
  square.classList.add("square");
  square.classList.add(`square-${index + 1}`);
  gridContainer.appendChild(square);
});
let squares = document.querySelectorAll(".square");
let squaresArr = Array.from(squares);
startGame();
function startGame() {
  xTurn = false;
  squaresArr.forEach((square) => {
    square.classList.remove(X_CLASS);
    square.classList.remove(CIRCLE_CLASS);
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
  });
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const square = e.target;
  const currentClass = xTurn ? X_CLASS : CIRCLE_CLASS;
  placemark(square, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    winningText.innerText = `${xTurn ? "X's" : "O's"} Win!`;
  }
  winningMessage.classList.add("show");
}

function placemark(square, currentClass) {
  square.classList.add(currentClass);
}

function swapTurns() {
  xTurn = !xTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some((combinations) => {
    return combinations.every((index) => {
      return squaresArr[index].classList.contains(currentClass);
    });
  });
}

//check for draw
function isDraw() {
  return squaresArr.every((square) => {
    return (
      square.classList.contains(X_CLASS) ||
      square.classList.contains(CIRCLE_CLASS)
    );
  });
}

restartBtn.addEventListener("click", startGame);
