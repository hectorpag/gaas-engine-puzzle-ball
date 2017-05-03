var loopInterval;
var frameCount = 0;

var timeToNextSpawn = fps;
var timeTakenToSpawn = 0;

var outOfBounds = -100;

var noOfZombies = 0;

var tacklesMade = 0;
var missedZombies = 0;

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
    if (missedZombies >= 3) {
        endGame();
    }
}

function endGame() {
    clearInterval(loop); 
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
    
    $(this).keydown(function (e) {
        e.preventDefault();
        checkKeyPress(e);
    });

	startGame();
});
