


/* Button navigation */
const pgs = document.querySelectorAll(".Pg");
const pgLen = pgs.length;

const setContent = function(content) {
    for (let i=0; i<pgLen; i++) {
        let pg = pgs[i];
        let pgName = pg.id;
        if (pgName.substr(0, pgName.length-2) !== content) {
            pg.style.display = "none";
        } else {
            pg.style.display = "block";
        }
    }

    for (let i=0; i<pgLen; i++) { // Weird catch to prevent the app from breaking... HTML you scary :(
        let pg = pgs[i];
        if (pg.style.display !== "none") {
            return;
        }
    }
    document.querySelector("#MainPg").style.display = "block";
}

// id = NamePg, button name = Name
const btns = document.querySelectorAll("#MainPg > button, .Main");

for (let i=0; i<btns.length; i++) {
    btns[i].addEventListener("click", function(e) {        
        setContent(e.target.getAttribute("name"));
    });
}


/* Simple Count Down Page */
const startRoundBtn = document.getElementById("StartRound");
const endTurn = document.querySelector('#endTurn');
const roundTimeInput = document.getElementById("time");
const display = document.querySelector('#timeDisplay');

const dice = document.querySelectorAll('.sc__red, .sc__yellow');
const whiteDie = document.querySelector('.sc__white');


const alertSound = new Audio('alert_sound.mp3');
let started = false;

const pCountInput = document.querySelector("#playercount");

const inputForm = document.querySelector(".input_form");

let timeInSec;

startRoundBtn.addEventListener("click", event => {
    if (started) return;
    let timeStr = roundTimeInput.value;
    let playerCountStr = pCountInput.value; 
    if (timeStr === "") {
        alert("Please enter a number for the time");
        return;
    }
    if (playerCountStr === "") {
        alert("Please enter a player count");
        return;
    }
    playerCount = parseInt(playerCountStr);
    timeInSec = parseInt(timeStr) * 60; // convert to milliseconds
    rollDice();
    inputForm.style.display = "none";
    startTimer(timeInSec, display);
});

const turnCounter = document.querySelector("#pXTurn");

let pXTurn = 1;
let playerCount;


function incTurnCounterAndUpdateUI() {
    pXTurn = (pXTurn % playerCount) + 1;
    turnCounter.innerText = "Player " + pXTurn + " turn";
}

const xSidedDie = sides => Math.floor(sides * Math.random()) + 1;

function rollaDie(diceEl) {
    const dieSides = 6;
    let dieResult = xSidedDie(dieSides);
    diceEl.innerText = dieResult;
}

function rollDice() {
    dice.forEach(die => {
        rollaDie(die);
    });
    // roll white dice
    let diceNumResult = xSidedDie(6);
    let display;
    if (diceNumResult <=3 ) {
        display = "Black Raiders";
        whiteDie.style.color = "black";
    } else if (diceNumResult === 4) {
        display = "Blue City";
        whiteDie.style.color = "blue";
    } else if (diceNumResult === 5) {
        display = "Green City";
        whiteDie.style.color = "green";
    } else {
        display = "Yellow City";
        whiteDie.style.color = "yellow";
    }
    whiteDie.innerText = display;
}

let intervalId;

endTurn.addEventListener("click", ()=>nextTurn());

function nextTurn() {
    if (intervalId === undefined) return;
    clearInterval(intervalId);
    rollDice();
    alertSound.play();
    incTurnCounterAndUpdateUI()
    startTimer(timeInSec, display);
}

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (display.textContent === "00:00") {
            nextTurn();
        }

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    started = true;
    timer();
    intervalId = setInterval(timer, 1000);
}



