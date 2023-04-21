let currentBrand = {};
let score = 0;
let timeLeft = 120;
let timerId;
let index = 0;
const shuffledBrands = shuffle(brands)

const gameImage = document.getElementById("game-image");
const gameForm = document.getElementById("game-form");
const gameInput = document.getElementById("game-input");
const gameSubmit = document.getElementById("game-submit");
const gamePass = document.getElementById("game-pass");
const gameMessage = document.getElementById("game-message");
const gameScore = document.getElementById("game-score");
const gameTimer = document.getElementById("game-timer");
const startButton = document.getElementById("start-button")
const mainScreen = document.getElementById("main-screen")

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomBrand() {
  return shuffledBrands[index++];
}

function displayBrand() {
  currentBrand = getRandomBrand();
  gameImage.setAttribute("src", `${currentBrand.image}`);
  gameInput.value = "";
  gameInput.focus();
}

function checkAnswer(answer) {
  if (answer.toLowerCase() === currentBrand.name.toLowerCase()) {
    score++;
    gameMessage.innerHTML = "Correct!";
    gameScore.innerHTML = `Score: ${score}`;
  } else {
    gameMessage.innerHTML = `Sorry, the correct answer was ${currentBrand.name}.`;
  }
  displayBrand();
}

function pass() {
  gameMessage.innerHTML = `The correct answer was ${currentBrand.name}.`;
  displayBrand();
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  gameTimer.innerHTML = `Time Left: ${minutes}:${seconds}`;
  timeLeft--;
  if (timeLeft < 0) {
    endGame();
  }
}

function startGame() {
  gameImage.style.display = "initial"
  startButton.style.display = "none"
  showGameScreen("on");
  displayBrand();

  timerId = setInterval(updateTimer, 1000);
  gameForm.addEventListener("submit", e => {
    e.preventDefault();
    const answer = gameInput.value.trim();
    if (answer !== "") {
      checkAnswer(answer);
    }
  });
  gamePass.addEventListener("click", pass);
}

function endGame() {
  clearInterval(timerId);
  gameMessage.innerHTML = `Game over! Your final score is ${score}.`;
  showGameScreen("off")

  if (score > 1)
    gameImage.setAttribute("src", "/images/celebrate.gif")
  else
  gameImage.setAttribute("src", "/images/sad-crying.gif")
  end
}

startButton.addEventListener("click", startGame)
startButton.style.display = "initial"

function showGameScreen(status) {
  if (status == "off"){
    gameForm.style.display = "none";
    gameScore.style.display = "none";
    gameTimer.style.display = "none";
  } else {
    gameForm.style.display = "initial";
    gameScore.style.display = "initial";
    gameTimer.style.display = "initial";
    mainScreen.style.background = "#fff"
  }
}

showGameScreen("off")
// startGame();
