var loopInterval;
var fps = 45;
var frameCount = 0;

var timeToNextSpawn = fps;
var timeTakenToSpawn = 0;

var outOfBounds = -100;

if (LEVEL_NUMBER === 1) {
    var maxNumberOfZombies = 20;
} else if (LEVEL_NUMBER === 2) {
    var maxNumberOfZombies = 30;
}


var noOfZombies = 0;

var tacklesMade = 0;
var missedZombies = 0;

var gameEnded = false;

var posClass = ['leftPos', 'middlePos', 'rightPos'];
var posValues = [70, 270, 470];

function updateTacklesMade() {
    tacklesMade++;
    $('.tacklesMade').html(tacklesMade);
}

function updateMissedZombies() {
    missedZombies++;
    $('.missedZombies').html(missedZombies);
}

function startGame() {
    loop = setInterval(mainLoop, (1000 / fps));
}

function checkEndGame() {
    if (missedZombies >= 3 || zombies.length === 0 && noOfZombies >= maxNumberOfZombies) {
        endGame();
    }
}

function endGame() {
    if (!gameEnded) {
        gameEnded = true;
        clearInterval(loop);
        
        saveVariables();
    }
}

function mainLoop() {
    frameCount++;
    timeTakenToSpawn++; 
    
    player.slidePlayer();
    
    if (timeTakenToSpawn >= timeToNextSpawn) {
        createZombies();
        timeTakenToSpawn = 0;
        if (timeToNextSpawn > 15) {
            timeToNextSpawn -= 0.5;
        }
    }
     
    moveZombies();
    destroyZombies(); 
    
    checkEndGame();
}

function checkKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == '37') {
		player.movePlayer(-1);
	} else if (e.keyCode == '39') {
		player.movePlayer(1);
	}
}

$(document).ready(function() {
    
    document.onkeydown = checkKeyPress;
	startGame();
});
