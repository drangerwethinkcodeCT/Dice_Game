'use strict';

// global Vars:
let p1TotalScore = 0;
let p2TotalScore = 0;
let currentScore = 0;
let currentPlayer = 0;

// Selecting HTML elements:
let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');
let score1Current = document.getElementById('current--0');
let score2Current = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const buttons = document.querySelectorAll('.btn');
const rollBtn = document.getElementById('roll--btn');

/** Checks whether the player has won:
 * returns bool
 */
const checkForWin = function (totalScore) {
    if (totalScore >= 40) {
        setWinner();
        return true;
    } else {
        return false;
    }
};

/**Applies changes to interface to display the winner.
 *
 */
const setWinner = function () {
    document.getElementById(`name--${currentPlayer}`).textContent = `WINNER!`;
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.toggle('player--active');
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    rollBtn.classList.add('btn-disabled');
};

/**Roll the dice:
 * Returns a random number in range 1-6.
 */
const diceRoll = function () {
    return Math.floor(Math.random() * 6 + 1);
};

/** Performs operations when 'roll dice' button is clicked:
 * Sets the dice image display equal to roll value.
 * Check for 1 roll.
 * Update round score for every roll of the dice.
 */
const onRollClick = function () {
    let rollValue = diceRoll();
    dice.src = `dice-${rollValue}.png`;
    currentScore += rollValue;

    if (rollValue === 1) {
        resetPlayerScore();
        switchPlayer();
    } else {
        document.getElementById(
            `current--${currentPlayer}`
        ).textContent = currentScore;
    }
};

/** Switch Players.
 * Toggle the player active class to change focus.
 * Change the current player.
 */
const switchPlayer = function () {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
};

/**Reset Score:
 * Resets all player scores when 1 is rolled.
 * Update user interface with 0 values.
 */
const resetPlayerScore = function () {
    if (currentPlayer === 0) {
        currentScore = p1TotalScore = 0;
        score1.textContent = 0;
        score1Current.textContent = 0;
    } else {
        currentScore = p2TotalScore = 0;
        score2.textContent = 0;
        score2Current.textContent = 0;
    }
};

/** Updating Scores when hold is pressed:
 * Add round score to total score.
 * Set interface total score.
 * Reset round score.
 * Call helper to check whether a winning total was reached.
 */
const updateScoreOnHold = function () {
    let win = false;
    if (currentPlayer === 0) {
        p1TotalScore += currentScore;
        score1.textContent = p1TotalScore;
        score1Current.textContent = currentScore = 0;
    } else {
        p2TotalScore += currentScore;
        score2.textContent = p2TotalScore;
        score2Current.textContent = currentScore = 0;
    }
};

/** Reset the game:
 *  Reset all variables.
 *  Reset the interface text.
 *  Change focus to player 1.
 */
const resetGame = function () {
    // Reset interface:
    document.getElementById(`name--0`).textContent = 'Player 1';
    document.getElementById(`name--1`).textContent = 'Player 2';
    rollBtn.classList.remove('btn-disabled');
    score1Current.textContent = score2Current.textContent = 0;
    score1.textContent = score2.textContent = 0;
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    // Reset Variables.
    p1TotalScore = p2TotalScore = currentScore = 0;
    currentPlayer = 0;
};

// Add Event Listeners for buttons:
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        // Roll dice button:
        if (buttons[i].classList.contains('btn--roll')) onRollClick();

        // New Game Button:
        if (buttons[i].classList.contains('btn--new')) resetGame();

        // Hold Button:
        if (buttons[i].classList.contains('btn--hold')) {
            // Update the player's total score:
            updateScoreOnHold();

            // Check for a winner.
            let winner =
                currentPlayer === 0
                    ? checkForWin(p1TotalScore)
                    : checkForWin(p2TotalScore);

            // If there is no winner, switch players.
            if (!winner) switchPlayer();
        }
    });
}
