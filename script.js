let score = 0;
let timer = 30;
let correctLetter = '';
let isGameRunning = false;

const bottle1 = document.getElementById('bottle1');
const bottle2 = document.getElementById('bottle2');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const backgroundMusic = document.getElementById('background-music');
const startButton = document.getElementById('start-button');

function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function createFallingLetter(letter, bottle) {
    const letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.textContent = letter;

    // Set a random animation delay to avoid overlap
    const randomDelay = Math.random() * 1; // Random delay between 0 and 1 seconds
    letterElement.style.animationDelay = `${randomDelay}s`;

    // Add click event listener to the letter
    letterElement.addEventListener('click', () => checkLetter(letterElement.textContent));

    bottle.appendChild(letterElement);

    // Remove the letter after the animation ends
    letterElement.addEventListener('animationend', () => {
        letterElement.remove();
    });
}

function updateBottles() {
    const letter1 = getRandomLetter();
    const letter2 = getRandomLetter();

    correctLetter = getRandomLetter();

    createFallingLetter(letter1, bottle1);
    createFallingLetter(letter2, bottle2);

    if (Math.random() < 1) {
        createFallingLetter(correctLetter, bottle1);
    } else {
        createFallingLetter(correctLetter, bottle2);
    }
}

function startGame() {
    isGameRunning = true;
    backgroundMusic.play();
    startButton.textContent = 'Stop Game';

    gameInterval = setInterval(() => {
        if (timer <= 0) {
            endGame();
            return;
        }

        updateBottles();
        timer--;
        timerDisplay.textContent = timer;
    }, 2000);
}

function stopGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    backgroundMusic.pause();
    startButton.textContent = 'Start Game';
}

function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    backgroundMusic.pause();
    alert(`Game Over! Your score is ${score}`);
    startButton.textContent = 'Start Game';
    timer = 30; // Reset timer
    score = 0;  // Reset score
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = timer;
}

function checkLetter(letter) {
    if (!isGameRunning) return;

    if (letter === correctLetter) {
        score += 500;
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

startButton.addEventListener('click', () => {
    if (isGameRunning) {
        stopGame();
    } else {
        startGame();
    }
});
