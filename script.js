// Define themes and their corresponding symbols
const themes = {
    animals: ['🐶', '🐱', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁'],
    numbers: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'],
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Watermelon', 'Strawberry', 'Pineapple', 'Cherry'],
    // Add more themes here
};

// Game variables
let selectedTheme = 'fruits'; // Default theme
let cards = [];
let moves = 0;
let score = 0;
let timerInterval;
let startTime;

// Functions to handle game logic
// JavaScript code
function initializeGame() {
    // Reset game variables
    moves = 0;
    score = 0;
    updateMoves();
    updateScore();
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = 'Time: 0 seconds';
    
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; // Clear previous cards

    // Generate pairs of cards based on the selected theme
    const themeSymbols = themes[selectedTheme];
    const cardSymbols = themeSymbols.concat(themeSymbols);
    
    // Shuffle the cards
    cardSymbols.sort(() => Math.random() - 0.5);

    // Create card elements and add them to the game board
    cardSymbols.forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'bg-blue-200', 'text-blue-800', 'flex', 'justify-center', 'items-center', 'text-lg', 'font-semibold', 'rounded-md', 'cursor-pointer', 'transition', 'duration-300', 'transform', 'hover:scale-105', 'hover:bg-blue-300');
        cardElement.textContent = symbol;
        cardElement.addEventListener('click', () => revealCard(cardElement));
        gameBoard.appendChild(cardElement);
        cards.push({ element: cardElement, symbol: symbol, revealed: false });
    });
}

function revealCard(card) {
    const selectedCard = cards.find(c => c.element === card);
    if (!selectedCard.revealed) {
        card.textContent = selectedCard.symbol;
        selectedCard.revealed = true;
        card.classList.add('clicked'); // Add 'clicked' class to change background color
        // Check for a match after a short delay
        setTimeout(checkForMatch, 500);
        moves++;
        updateMoves();
        if (moves === 1) {
            startTimer();
        }
    }
}

function checkForMatch() {
    const revealedCards = cards.filter(c => c.revealed);
    if (revealedCards.length === 2) {
        const [card1, card2] = revealedCards;
        if (card1.symbol === card2.symbol) {
            // Match found
            score += 10; // Increment score for each match
            updateScore();
        } else {
            // No match, hide the cards
            setTimeout(() => {
                card1.element.textContent = '';
                card2.element.textContent = '';
                card1.element.classList.remove('clicked'); // Remove 'clicked' class to reset background color
                card2.element.classList.remove('clicked');
                card1.revealed = false;
                card2.revealed = false;
            }, 500);
        }
    }
}


function updateMoves() {
    document.getElementById('moves').textContent = `Moves: ${moves}`;
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Time: ${elapsedTime} seconds`;
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Congratulations! You completed the game in ${moves} moves with a score of ${score}.`);
}

// Event listener for the Start Game button
document.getElementById('startBtn').addEventListener('click', function() {
    initializeGame();
});

// Call initializeGame() to start the game
initializeGame();
