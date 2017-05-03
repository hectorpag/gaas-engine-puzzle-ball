var START_TIME;

var FINAL_SCORE, FINAL_TIME;

// This function is called at the start of game record a time stamp
function startGame() {
	START_TIME = 0;
}

// This is where the final score and/or time is logged
function saveScore() {
	FINAL_SCORE = 0;
	FINAL_TIME = 0;
}

// This is where any other variables can be logged
// The variables that get logged here help us detect 
// cheaters and also evaluate a users experience
function saveVariables() {
	
}