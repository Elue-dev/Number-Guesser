let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const minNum = document.querySelector ('.min-num'),
      maxNum = document.querySelector ('.max-num'),
      game = document.querySelector ('#form'),
      guessInput = document.querySelector ('#form-input'),
      submitGuess = document.querySelector ('#submit'),
      message = document.querySelector ('.message');


//Set min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

//Play Again
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
      window.location.reload();
      message.style.display = 'none';
    }
  });

//Listen for guess
submitGuess.addEventListener ('click', submit);


function submit(){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess <= 0 || guess > 10){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    
    //Game over - won
    if(guess === winningNum){
         gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }
    else{
        guessesLeft -=1;

    if(guessesLeft === 0){
          //Game over if lost
        gameOver(false, `GAME OVER!, you lost, ${winningNum} was the winning number`);
    }
    else{
        //Game continues, answer wrong

        guessInput.style.borderColor = 'red';

        guessInput.value = '';

        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
       
    }
  }
    if(guess < 1 || guess > 10){
        message.textContent = `Your guess must be between ${min} and ${max}, you wasted a guess, ${guessesLeft} guesses left `
    }

    if(isNaN(guess)){
        message.textContent = `Your guess must be a number, you wasted a guess, ${guessesLeft} guesses left`
    }

    else if(guessesLeft===0){
        message.textContent = `GAME OVER!, you lost, ${winningNum} was the winning number`;
    }
}



function setMessage(msg, color){
    message.style.color =color;
    message.textContent = msg;
}

function gameOver(won, msg){

    won === true ? color = 'green' : color = 'red'
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = msg;

    //Play Again
    submitGuess.value = 'PLAY AGAIN';
    submitGuess.className += 'play-again';
}

function getRandomNum(min, max){
    return (Math.floor(Math.random()*(max-min+1)+min));
}

