// Option of words.
var wordsList = [
	"lebron james",
	"michael jordan",
	"wilt chamberlain",
	"gary payton",
	"kobe bryant",
	"shaquille oneal",
	"carmelo anthony",
	"wilt the stilt",
	"dominique wilkins",
	"steph curry",
	"kevin durant",
	"kevin love",
	"tristan thompson",
	"klay thompson",
	"scottie pippen",
	"doctor j",
	"giannis antetokounmpo",
	"kawhi leonard",
	"russell westbrook",
	"paul george",
	"kyrie irving"
];

// *********VARIABLES********* //

// Solution will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 15;
// ================================================= //



// **********FUNCTIONS********* //

// Round start
function startGame() {
	// Reset the guesses back to 0
	numGuesses = 15;

	// Solution is chosen randomly from wordList.
	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

	// The word is broken into individual letters.
	lettersInChosenWord = chosenWord.split("");

	// We count the number of letters in the word.
	numBlanks = lettersInChosenWord.length;

	// We print the solution in console (for testing).
	console.log(chosenWord);

	// CRITICAL LINE = Here we reset the guess and success array at each round.
	blanksAndSuccesses = [];
	// CRITICAL LINE = Here we reset the wrong guesses from the previous round.
	wrongGuesses = [];

	// Fill up the blanksAndSuccesses list with appropriate number of blanks.
	// This is based on number of letters in solution.
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");

	}

	// Print the initial blanks in the console.
	console.log(blanksAndSuccesses);


	// Reprints the guessesLeft to 15
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

	// Clears the wrong guesses from the previous round 
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}


// checkLetters() function
// It's where we will do all of the comparisons for matches.
// It's not being called here, just being made for future use.
function checkLetters(letter) {

	// This boolean will be toggled based on whether or not a user letter
	// is found anywhere in the word
	var letterInWord = false;

	// Check if a letter exists inside the array at all.
	for (var i = 0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			// If the letter the user chooses exists then set the boolean to true.
			letterInWord = true;
		}
	}

	// If the letter exists somewhere in the word, then figure out where.
	if (letterInWord) {

		// Loop through the word.
		for (var j = 0; j < numBlanks; j++) {

			// Populate the blanksAndSuccesses with every instance of the letter.
			if (chosenWord[j] === letter) {
				// Here we set the specific space in blanks and letter equal to 
				// the letter when there is a match.
				blanksAndSuccesses[j] = letter;
			}
		}
		// Logging for testing.
		console.log(blanksAndSuccesses);
	}
	// If the letter doesn't exist at all
	else {
		// Add the wrong guess to the list of wrong letters
		wrongGuesses.push(letter);
		// Subtract the number of guesses left
		numGuesses--;
	}
}


// Here is all the code that needs to run after each guess is made
function roundComplete() {

	// First, log an initial status update in the console telling us how mnay wins, losses, and guesses are left.
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses. Also update the correct guesses.
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// Puts the array of guesses and blanks on the page
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join("");

	// Puts the wrong guesses onto the page.
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// If we win and guess the random word
	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		
		// Add to the win counter and give the user an alert.
		winCounter++;
		alert("You win!");

		// Update the win counter in HTML and restart the game.
		document.getElementById("win-counter").innerHTML = winCounter;
		startGame();
	}

	// If we lose and run out of guesses
	else if (numGuesses === 0) {
		// Add to the loss counter
		lossCounter++;
		// Give the user an alert.
		alert("You Lose");

		// Update the loss counter in the HTML.
		document.getElementById("loss-counter").innerHTML = lossCounter;
		// Restart the game.
		startGame();
	}

}
// ==================================================================== //



// ********MAIN PROCESS******* //

// Starts the game by running the startGame() function
startGame();

// Then initiate the function for capturing the key presses.
document.onkeyup = function(event) {
	// Converts all the key presses to lowercase letters.
	var letterGuessed = String.fromCharCode(event.which).toLowerCase();
	// Runs the code to check for correctness.
	checkLetters(letterGuessed);
	// Runs the code after each round is done.
	roundComplete();
};

// ==================================================================== //
