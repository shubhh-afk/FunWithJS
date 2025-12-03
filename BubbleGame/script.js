// variables used :-

let timer = 60;
let score = 0;
let targetNum = "";
let hitRn = 0;
let timerInterval;

// function to make bubbles with random numbers.
function makeBubbles() {
  let clutter = "";
  for (let i = 1; i <= 182; i++) {
    // 182 iterations are not fixed, these number of bubbles perfectly fit on my screen, that's why i used that.
    let random = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${random}</div>`;
  }

  document.querySelector("#pbottom").innerHTML = clutter;
}

// function to make a timer for the game for 60s.
function runTimer() {
  timerInterval = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").textContent = timer;
    } else {
      // these codes will refersh the timer after 60s and displays "Game Over" text on screen.
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// function to get new "Hits".
function getNewHit() {
  hitRn = Math.floor(Math.random() * 10);
  document.getElementById("hits").textContent = hitRn;
}

// function to increase score by 10.
function increaseScore() {
  score += 10;
  document.querySelector("#scoreVal").textContent = score;
}

// function to refresh hit value & make another set of bubbles with random numbers,
// everytime the target number matches the hit value.
function refreshHits() {
  if (targetNum === hitRn) {
    increaseScore();
    makeBubbles();
    getNewHit();
  }
}

// function that adds text and new game button after timer ends.
function gameOver() {
  document.querySelector("#pbottom").innerHTML = `
      <div id="endContainer">
        <h1>Game Over</h1>
        <button id="newGame">New Game</button>
      </div>
    `;

  document.getElementById("newGame").addEventListener("click", resetGame);
}

// Function to reset the game.
function resetGame() {
  timer = 60;
  score = 0;
  document.querySelector("#scoreVal").textContent = score;
  document.querySelector("#timer").textContent = timer;

  makeBubbles();
  getNewHit();
  runTimer();
}

// adding eventlistener on #pbottom so it recognise the clicks.
document.querySelector("#pbottom").addEventListener("click", function (dets) {
  targetNum = Number(dets.target.textContent); // dets.target.textContent -> gives the number inside the bubble.
  refreshHits();
});

makeBubbles();
runTimer();
getNewHit();
