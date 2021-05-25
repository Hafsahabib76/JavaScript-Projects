
let score = 20;
let secretNumber = Math.trunc(Math.random() * 20 ) + 1;
let highscore = 0;

const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
} 


//check button functionality
document.querySelector('.check').addEventListener('click', function() {

    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);

    //if player enter no number
    if(!guess){
        displayMessage('⛔ No Number!');
    }

    //if player guess is equal to the secret Number
    else if(guess === secretNumber){
        displayMessage('🎉 Correct Number!');
        //when win the game change background color to green
        // document.querySelector('body').style.backgroundColor = '#088A1F';
        //show secret number to the player
        document.querySelector('.number').textContent = secretNumber;
        //increase number box width and change bg color
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').style.backgroundColor = '#088A1F';
        document.querySelector('.number').style.border = '7px solid #088A1F';
        document.querySelector('.number').style.color = '#222';
        document.querySelector('header').style.borderBottom = '14px solid #088A1F';
        document.querySelector('.guess').style.border = '7px solid #088A1F';

        //implementing high score logic
        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }

    //if guess is not equal to secret number
    else if(guess !== secretNumber){

        if(guess > 20){
            displayMessage('🚫 Numbers only from 0 to 20');
        } else {
        guess > secretNumber ? displayMessage('📈 Guess is Too High!') : displayMessage('📉 Guess is Too Low!');
        }

        //stop the game if score is zero (0) 
        if (score > 1){
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥 You Lost the Game!');
            ///set score to zero
            document.querySelector('.score').textContent = '0';
            //when lost the game change background color to red
            // document.querySelector('body').style.backgroundColor = '#C12405';
            //show secret number to the player
            document.querySelector('.number').textContent = secretNumber;
            //increase number box width and change bg color
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').style.backgroundColor = '#C12405';
            document.querySelector('.number').style.border = '7px solid #C12405';
            document.querySelector('.number').style.color = '#222';
            document.querySelector('header').style.borderBottom = '14px solid #C12405';
            document.querySelector('.guess').style.border = '7px solid #C12405';
        }
    }

});

//tryagain button functionality
document.querySelector('.again').addEventListener('click', function () {

    score = 20;
    secretNumber = Math.trunc(Math.random() * 20 ) + 1;

    displayMessage('Start guessing!');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    //reset the background color
    document.querySelector('body').style.backgroundColor = '#222';
    
    //reset number box width and change bg color
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').style.backgroundColor = '#222';
    document.querySelector('.number').style.color = '#EE7221';
    document.querySelector('.number').style.border = '7px solid #E4B705';
    document.querySelector('header').style.borderBottom = '14px solid #E4B705';
    document.querySelector('.guess').style.border = '7px solid #E4B705';      

});