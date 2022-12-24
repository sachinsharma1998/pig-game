'use strict';

// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0'); //same as query
const current1El = document.getElementById('current--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCloseModal = document.querySelector('.btn--close');
const btnsOpenModal = document.querySelectorAll('.btn--open');

// starting conditions
const openModal = function () {
  modal.classList.remove('hiddens');
  overlay.classList.remove('hiddens');
};
const closeModal = function () {
  modal.classList.add('hiddens');
  overlay.classList.add('hiddens');
};
const hideDice = function () {
  diceEl.classList.add('hidden');
};

let scores, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  hideDice();
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const roll = function () {
  if (playing) {
    // generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled if true
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
};

const hold = function () {
  if (playing) {
    // add current score to active player
    scores[activePlayer] += currentScore;
    // scores[1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      hideDice();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
};
btnCloseModal.addEventListener('click', closeModal);
btnsOpenModal[0].addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  roll();
});

btnHold.addEventListener('click', function () {
  hold();
});

// reset
btnNew.addEventListener('click', function () {
  init();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') roll();
  console.log(e.key);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Shift') hold();
});
document.addEventListener('keydown', function (e) {
  if (e.key === ' ') init();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
