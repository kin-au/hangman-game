(function () {

const randomWordArray = ["Awkward", "Bagpipes", "Banjo", "Bungler", "Croquet", "Crypt", "Dwarves", "Fervid", "Fishhook", "Fjord", "Gazebo", "Gypsy", "Haiku", "Haphazard", "Hyphen", "Ivory", "Jazzy", "Jiffy", "Jinx", "Jukebox", "Kayak", "Kiosk", "Klutz", "Memento", "Mystify", "Numbskull", "Ostracize", "Oxygen", "Pajama", "Phlegm", "Pixel", "Polka", "Quad", "Quip", "Rhythmic", "Rogue", "Sphinx", "Squawk", "Swivel", "Toady", "Twelfth", "Unzip", "Waxy", "Wildebeest", "Yacht", "Zealous", "Zigzag", "Zippy", "Zombie"];
// const imageArea = document.getElementById('imageArea');
const wordArea = document.getElementById('wordArea');
const image = document.getElementById('image');
const message = document.getElementById('message');
const answer = document.getElementById('answer');
const submitAnswer = document.getElementById('submitAnswer');
const submitRandomWord = document.getElementById('randomWord');
const guessArea = document.getElementById('guessArea');
const letterButton = document.getElementsByClassName('letterButton');
const onlyLetters = /[^a-zA-Z]/;
let answerValue = '';
let answerArray = [];
let correctGuessArray = [];
let remainingGuesses = 10;
let imageSrc = 0;

answer.focus();
disableButtons();

function generateRandomWord (event) {
    event.preventDefault();
    answerValue = randomWordArray[Math.floor(Math.random() * randomWordArray.length)].toUpperCase();
    setUpAnswer(answerValue);
}

submitRandomWord.addEventListener('click', generateRandomWord);


function inputAnswer(event) {
    answerValue = answer.value.toUpperCase();
    let testAnswer = onlyLetters.test(answerValue);
    event.preventDefault();
    if (answerValue === '' || testAnswer ) {
        message.innerHTML = 'Oops! Enter a word for your opponent to guess';
        answer.focus();
    } else {
        setUpAnswer(answerValue);
    }
}

submitAnswer.addEventListener('click', inputAnswer);


function setUpAnswer (answerValue) {
    answerArray = answerValue.split('');
    
    // answer.reset(); // doesn't work here - is this only for 'form' elements? 
    answer.value = '';
    answer.disabled = true;
    submitAnswer.disabled = true;
    submitRandomWord.disabled = true;
    for (i = 0; i < answerArray.length; i++) {
        const spanContent = document.createTextNode(' _ ');
        const newSpan = document.createElement('span');
        newSpan.appendChild(spanContent);
        // newSpan.id = 'letter' + i; // yes this works if I want to set id to span elements
        newSpan.classList.add('letters');
        wordArea.appendChild(newSpan);
    }
    enableButtons();
}

function guessLetter(event) {
    let guessValue = event.target.innerHTML;
    let guessValueCheck = event.target.tagName;
    console.log(event);

    // using this to check if a button was actually clicked, rather than just the guessArea element
    // also possible to use "guessValue.length !== 1"
     if (guessValueCheck === "BUTTON") { // any better way to do this?
        event.target.disabled = true;
        checkLetter(guessValue);
    }
}


function checkLetter(guessValue) {
    let guessIndex = answerArray.indexOf(guessValue);
    if (guessIndex === -1) {
            wrongGuess();
    } else {
            correctGuess(guessValue, guessIndex);
        }
    }

guessArea.addEventListener('click', guessLetter);


function wrongGuess() {
    remainingGuesses--
    imageSrc++
    image.setAttribute('src', "Images/hangman" + imageSrc + '.jpg')
        if (remainingGuesses === 0) {
        loseGame();
    } else if (remainingGuesses === 1) {
        message.innerHTML = 'Last chance!';
    } else {
        message.innerHTML = 'Keep guessing...';
    }
}


function correctGuess(guessValue, guessIndex) {
    const letterIndex = document.getElementsByClassName('letters')[guessIndex];
    letterIndex.innerHTML = guessValue;
    correctGuessArray.push(guessValue);
    answerArray[guessIndex] = '*';
    document.getElementById('message').innerHTML = ' ';
    if (isLetterInAnswer(guessValue)) {
        checkLetter(guessValue);
    } else if (correctGuessArray.length === answerArray.length) {
        winGame();
    } 
}


function isLetterInAnswer(guessValue) {
    return answerArray.includes(guessValue);
}


function winGame() {
    message.innerHTML = 'WINNER WINNER FRIED CHICKEN DINNER';
    disableButtons();
}


function loseGame() {
    message.innerHTML = 'Game over! The answer was "' + answerValue + '"';
    disableButtons();
}


function enableButtons() {
    for (let i = 0; i < letterButton.length; i++) {
        letterButton[i].disabled = false;
    }
}


function disableButtons() {
    for (let i = 0; i < letterButton.length; i++) {
        letterButton[i].disabled = true;
    }
}


function resetGame() {
    // write "are you sure you want to reset" function - only if not wingame/losegame stage, shows pop-up to ask user 
    image.setAttribute('src', 'Images/hangman0.jpg');
    imageSrc = 0;
    answerArray = [];
    correctGuessArray = [];
    remainingGuesses = 10;
    disableButtons();
    answer.disabled = false;
    answer.focus();
    submitAnswer.disabled = false;
    submitRandomWord.disabled = false;
    message.innerHTML = ' ';
    wordArea.innerHTML = ' ';
}

document.getElementById('reset').addEventListener('click', resetGame);



})();
