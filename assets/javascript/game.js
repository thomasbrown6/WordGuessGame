//firing elements upon document readiness
var guessesLeftElement;
var scoreElement;
var roundElement;
var blankWordElement;


// Defining Variables To Be Used //
var choices = [
	"MICHAEL JORDAN",
	"LEBRON JAMES",
	"KOBE BRYANT",
	"KYRIE IRVING",
	"MAGIC JOHNSON",
	"STEPHEN CURRY",
	"KEVIN DURANT",
	"CARMELO ANTHONY",
	"ALLEN IVERSON",
	"JOHN STARKS",
	"CHARLES BARKLEY",
	"PATRICK EWING",
	"GIANNIS ANTETOKOUNMPO",
	"DWYANE WADE",
	"KING JAMES",
	"SHAQUILLE ONEAL",
	"LARRY BIRD",
	"TIM DUNCAN",
	"RUSSELL WESTBROOK",
	"RAY ALLEN",
	"DOMINIQUE WILKINS",
	"CLYDE DREXLER",
	"MOSES MALONE",
	"CHRIS PAUL",
	"SCOTTIE PIPPEN",
	"ISIAH THOMAS",
	"JOHN STOCKTON",
	"STEVE NASH",
	"KARL MALONE",
	"JULIUS ERVING",
	"DIRK NOWITZKI",
	"HAKEEM OLAJUWON",
	"WILT CHAMBERLAIN"
];


var score = 0;
var round = 0;
var answer = "";
var blankAnswer = "";
var blanks = "-";
var guessesLeft = 12;


// *****RUNS ON LOAD***** //
$(document).ready(function () {
    guessesLeftElement = $("#guess-counter");
    scoreElement = $("#score-counter");
    roundElement = $("#round-counter");
    blankWordElement = $("#blank-word");
    startRound();

});


// ************MAIN FUNCTIONS************ //

//Round Starts
function startRound() {
    blankAnswer = "";
    answer = choices[Math.floor(Math.random() * choices.length)];
    guessesLeft = 12;
    for (k = 0; k < answer.length; k++) {
        if (answer[k] == " ") {
            blankAnswer += " ";
        }

        else {
            blankAnswer += blanks;
            blankWordElement.html(blankAnswer);
        }
    }

    round++;
    $("#alpha-grid input").animate({ opacity: "1"}).prop("disabled", false);


};

//Win Round, New Round Begins
function nextRound() {

    startRound();
    score++;


};

//Reset the game
function reset() {
    alert("You failed to solve! In order to progress you must solve. Please start over");
    score = 0;
    round = 0;
    roundsLeft = 0 - score
};


//Compare user guess with the answer and fill appropriate letter slots
function checkGuess(userGuess) {
   
    var roundAnswer = "";

    //only lose a guess if you miss the letter
    if (!answer.includes(userGuess)) {

        guessesLeft--;
    }

    for (i = 0; i < answer.length; i++) {
           
        if (blankAnswer[i] == blanks) {
           

            if (answer[i] === userGuess) {
                roundAnswer += userGuess;
            }

            else {
                
                roundAnswer += blanks;
            }
            
        }
        else {
            roundAnswer += blankAnswer[i];
        }
    }
    // guessesLeft--;
    blankAnswer = roundAnswer;
}

function userClick(img) {    
    
    $(img).animate({ opacity: "0.05"}).prop("disabled", true);    
    
    var userGuess = $(img).val();

    if (guessesLeft > 0) {

        checkGuess(userGuess);

        //round won
        if (blankAnswer === answer) {
            alert(answer);
            nextRound();
            
        }
    }

    //Game ends and resets to the beginning.
    else {
        reset();
        startRound();
        
    }


    guessesLeftElement.html(guessesLeft);
    scoreElement.html(score);
    roundElement.html(round);
    blankWordElement.html(blankAnswer);

}
