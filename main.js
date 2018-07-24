


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
const roundTimeInput = document.getElementById("time");
const display = document.querySelector('#timeDisplay');

const alertSound = new Audio('alert_sound.mp3');


startRoundBtn.addEventListener("click", event => {
    let timeStr = roundTimeInput.value;
    if (timeStr === "") {
        alert("Please enter a number for the time");
        return;
    }
    let timeInSec = parseInt(timeStr) * 60; // convert to milliseconds
    startTimer(timeInSec, display);
});


function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds,
        intervalId;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            alertSound.play();
        }

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    intervalId = setInterval(timer, 1000);
}



