// variables
const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");
const highScorElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

// set block's dimension
const blockWidth = 30;
const blockHeight = 30;

// score and time variables
let highScore = localStorage.getItem("highScore");

let score = 0;
let time = "00:00";

// calculate row & cols
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];

let snake = [{ x: 1, y: 3 }];

let direction = "down";
let intervalId = null;
let timerIntervalId = null;

// food spawn position set at random
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

// creating dynamic blocks on the board element
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

// whole game logic + render snake and food visually
function render() {
  // 1) compute new head from current head + direction
  const current = snake[0];
  let head;
  if (direction === "left") head = { x: current.x, y: current.y - 1 };
  else if (direction === "up") head = { x: current.x - 1, y: current.y };
  else if (direction === "down") head = { x: current.x + 1, y: current.y };
  else if (direction === "right") head = { x: current.x, y: current.y + 1 };
  highScorElement.innerText = highScore;

  // 2) check wall collision immediately
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }

  // 3) add new head
  snake.unshift(head);

  // 4) if we ate food, spawn new food; otherwise remove tail
  // food consumption logic
  if (head.x === food.x && head.y === food.y) {
    // increase score
    score += 10;
    scoreElement.innerText = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
    // spawn food somewhere not on the snake
    do {
      food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
      };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
  } else {
    const tail = snake.pop();
    const removeTail = blocks[`${tail.x}-${tail.y}`];
    if (removeTail) removeTail.classList.remove("fill");
  }

  // 5) draw snake (add fill for each segment)
  snake.forEach((segment) => {
    const snakeBody = blocks[`${segment.x}-${segment.y}`];
    if (snakeBody) snakeBody.classList.add("fill");
  });

  // 6) draw food (ensure previous food class cleared if needed)
  // Clear any stale food nodes first (optional)
  Object.values(blocks).forEach((b) => {
    if (b && b.classList) b.classList.remove("food");
  });
  const spawnfood = blocks[`${food.x}-${food.y}`];
  if (spawnfood) spawnfood.classList.add("food");
}

// start button modal display before starting the game
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    time = `${min}:${sec}`;
    timeElement.innerText = time;
  }, 1000);
});

// Game restart logic
restartButton.addEventListener("click", restartGame);
function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  modal.style.display = "none";
  snake.forEach((segment) => {
    const snakeBody = blocks[`${segment.x}-${segment.y}`];
    if (snakeBody) snakeBody.classList.remove("fill");
  });
  score = 0;
  time = `00:00`;
  scoreElement.innerText = score;
  timeElement.innerText = time;
  snake = [{ x: 3, y: 5 }];
  direction = "right";
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => render(), 300);
}

// switch snake directon based on keyboard input
addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
    // console.log(direction);
  } else if (event.key == "ArrowDown") {
    direction = "down";
    // console.log(direction);
  } else if (event.key == "ArrowLeft") {
    direction = "left";
    // console.log(direction);
  } else if (event.key == "ArrowRight") {
    direction = "right";
    // console.log(direction);
  }
});
