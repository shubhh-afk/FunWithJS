const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const blockWidth = 80;
const blockHeight = 80;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];

let snake = [{ x: 1, y: 3 }];

let direction = "down";
let intervalId = null;

// food spawn position set at random
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  // 1) compute new head from current head + direction
  const current = snake[0];
  let head;
  if (direction === "left") head = { x: current.x, y: current.y - 1 };
  else if (direction === "up") head = { x: current.x - 1, y: current.y };
  else if (direction === "down") head = { x: current.x + 1, y: current.y };
  else if (direction === "right") head = { x: current.x, y: current.y + 1 };

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
  const ateFood = head.x === food.x && head.y === food.y;

  if (ateFood) {
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

  console.log(snake);
}

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

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  modal.style.display = "none";
  snake.forEach((segment) => {
    const snakeBody = blocks[`${segment.x}-${segment.y}`];
    if (snakeBody) snakeBody.classList.remove("fill");
  });
  snake = [{ x: 3, y: 5 }];
  direction = "right";
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => render(), 300);
}
