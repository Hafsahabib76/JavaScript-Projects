
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const instructionsModal = document.querySelector('.modal');
const showGameInstructionsModal = document.querySelector('.instructions--modal');
const closeGameInstructionsModal = document.querySelector('.close-modal');
const gameOverlay = document.querySelector('.overlay');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true; 

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init(); 

const switchPlayer = function () {
    //set current score to 0 of active player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    //switch to next Player
    //assigning ternary condition i.e. if activePlayer is 0 then switch to 1 else switch to 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //player--active css style to show the active player css
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Dice Rolling Functionality
btnRoll.addEventListener('click', function () {
    if(playing) {
        // 1. Generate a Random Dice Roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice${dice}.png`;

        // 3. Check for the Roll 1: if true - switch to the next player
        if(dice !== 1){
            // add Dice to the current score card
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //Switch to the Next Player
            switchPlayer();
        }
    }
});

//Hold Button Functionality
btnHold.addEventListener('click', function () {

    if(playing) {

        // 1. Add Current Score to Active Player's Score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. If Score is Player's Score >= 100
        if(scores[activePlayer] >= 100){
            //Finish the Game
            playing = false;
            diceEl.classList.add('hidden');
        
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            //show alert when player win the game
            setTimeout(function(){
                alert(activePlayer == 0 ? 'Yahoo!! 🎉🎖 Player 1 Won the Game.' : 'Yahoo!! 🎉🎖 Player 2 Won the Game.');
              }, 1000);
            
        }
        else{
            //Switch to the Next Player
            switchPlayer();
        }
    }           
});

//NewGame Functionality
btnNew.addEventListener('click', init);

//show game instructions modal function
const showModal = function() {
    instructionsModal.classList.remove('hidden');
    gameOverlay.classList.remove('hidden');
};

//close game instructions modal function
const closeModal = function() {
    instructionsModal.classList.add('hidden');
    gameOverlay.classList.add('hidden');
};

showGameInstructionsModal.addEventListener('click', showModal);

closeGameInstructionsModal.addEventListener('click', closeModal);

gameOverlay.addEventListener('click', closeModal);

//hide modal when ESC button pressed by the player
document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !instructionsModal.classList.contains('hidden')){
        closeModal();
    }
});