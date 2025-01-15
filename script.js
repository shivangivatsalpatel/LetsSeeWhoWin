'use strict';

//selecting elements
let scoreOfPlayer1 = document.querySelector('#score--0');
let scoreOfPlayer2 = document.getElementById('score--1');
let diceRoller = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let currScoreOfPlayer1 = document.getElementById('current--0');
let currScoreOfPlayer2 = document.getElementById('current--1');
let activePlayer0 = document.querySelector('.player--0');
let activePlayer1 = document.querySelector('.player--1');

//starting conditoins
//scoreOfPlayer1.textContent = 0;
//scoreOfPlayer2.textContent = 0;
//diceRoller.classList.add('hidden');

//const scores = [0, 0];
//let currentScore = 0;
//let activePlayer = 0;
//let playing = true;

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreOfPlayer1.textContent = 0;
  scoreOfPlayer2.textContent = 0;
  currScoreOfPlayer1.textContent = 0;
  currScoreOfPlayer2.textContent = 0;

  diceRoller.classList.add('hidden');
  activePlayer0.classList.remove('player--winner');
  activePlayer1.classList.remove('player--winner');
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  //1.generate random numbers
  if (playing) {
    let diceRandomNumber = Math.trunc(Math.random() * 6) + 1;

    //2.display dice

    diceRoller.classList.remove('hidden');
    diceRoller.src = `dice-${diceRandomNumber}.png`;

    //3.check for rolled if 1 then  switch user

    if (diceRandomNumber !== 1) {
      currentScore = currentScore + diceRandomNumber; //or currentScore += diceRandomNumber
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1.store current value in the players score
  if (playing) {
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if the score is more than 100 or not if yes finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(` .player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(` .player--${activePlayer}`)
        .classList.remove('player--active');
      diceRoller.classList.add('hidden');
    } else {
      //3.switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
