const btnPlay = document.querySelector('.btn-play');
const btnHigher = document.querySelector('.higher');
const btnLower = document.querySelector('.lower');
const btnTryAgain = document.querySelector('.btn-try-again');
const btnMenu = document.querySelector('.btn-menu');

const menu = document.getElementById('menu');
const gameWindow = document.getElementById('game-window');
const popupScreen = document.querySelector('.popup-screen');
const popup = document.querySelector('.popup');
const finalScoreSpan = document.querySelector('.final-score')

const leftWindow = document.querySelector('.left-window');
const leftName = document.querySelector('.name-left');
const leftDescription = document.querySelector('.description-left');
const scoreSpan = document.querySelector('.score');
let score = 0;

const badSign = document.querySelector('.bad-answer');
const goodSign = document.querySelector('.good-answer');

const rightWindow = document.querySelector('.right-window');
const rightName = document.querySelector('.name-right');
const rightDescription = document.querySelector('.description-right');
const rightSpan = document.querySelector('.first-user-name');

// Roll up the MENU when the PLAY button is clicked

btnPlay.addEventListener('click', () => {
    menu.classList.add('rolled-up');
    setTimeout(function (){ gameWindow.style.transform = "translateY(0)";}, 200);
});

// First Data Load

let RandomIndex;
let RandomIndex2;

function changeData(title, description, window, firstIndex, secondIndex) {
    title.textContent = data[firstIndex].name;
    description.textContent = data[firstIndex].description;
    window.style.background = `linear-gradient(rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)),
    url(${data[secondIndex].image})`;
    window.style.backgroundPosition = "center";
    window.style.backgroundRepeat = "no-repeat";
    window.style.backgroundSize = "cover";
}

function FirstDataLoad () {
    RandomIndex = getRandomIndex(0,55);
    
    changeData(leftName, leftDescription, leftWindow, RandomIndex, RandomIndex);
    rightSpan.textContent = data[RandomIndex].name;

    RandomIndex2 = getRandomIndex(0,55);

    if(RandomIndex2===RandomIndex){
        while(RandomIndex2 === RandomIndex) {
            RandomIndex2 = getRandomIndex(0,55);
        }
    }
    changeData(rightName, rightDescription, rightWindow, RandomIndex2, RandomIndex2);
}

FirstDataLoad();
scoreSpan.textContent = score;

// This is what starts when the answer is correct

function rightAnswer () {
    score++;
    scoreSpan.textContent = score;
    goodSign.style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(function (){ goodSign.style.transform = "translate(-50%, -50%) scale(0)";}, 2000);

    setTimeout(function () {
        RandomIndex=RandomIndex2;

        changeData(leftName, leftDescription, leftWindow, RandomIndex, RandomIndex2);
        rightSpan.textContent = data[RandomIndex2].name;


        RandomIndex2 = getRandomIndex(0,55);

        if(RandomIndex2===RandomIndex){
            while(RandomIndex2 === RandomIndex) {
                RandomIndex2 = getRandomIndex(0,55);
            }
        }
         changeData(rightName, rightDescription, rightWindow, RandomIndex2, RandomIndex2);

    }, 2000);
    
}

function gameEnd() {
    badSign.style.transform = "translate(-50%, -50%) scale(0)";
    popupScreen.hidden = false;
    popup.classList.add('popupIn');
}

function badAnswer () {
    finalScoreSpan.textContent = score;
    badSign.style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(function() {gameEnd()}, 2000);
    score = 0;
}


btnMenu.addEventListener('click', () => {
    popupScreen.hidden = true;
    menu.classList.remove('rolled-up');
    gameWindow.style.transform = "translateY(100%)";
    setTimeout(function() {FirstDataLoad();}, 2000);
    scoreSpan.textContent = "0";
});

btnTryAgain.addEventListener('click', () => {
    popupScreen.hidden = true;
    FirstDataLoad();
    scoreSpan.textContent = "0";
});

//BUTTONS CHECKING IF ANSWER IS CORRECT


btnHigher.addEventListener('click', () => {
    disableButton(btnHigher);
    if(data[RandomIndex2].follower_count >= data[RandomIndex].follower_count) {
        rightAnswer();
    }
    else {
        badAnswer();
    }
});


btnLower.addEventListener('click', () => {
    disableButton(btnLower);
    if(data[RandomIndex2].follower_count <= data[RandomIndex].follower_count) {
        rightAnswer();
    }
    else {
        badAnswer();
    }
});

// Disables buttons so user cannot spam it

function disableButton(button) {
    button.disabled = true;
    setTimeout(function() {button.disabled = false;}, 2000);
}

// Returns random index inluding max

function getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }