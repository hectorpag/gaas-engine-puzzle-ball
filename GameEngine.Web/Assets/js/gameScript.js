var loopInterval;
var frameCount = 0;

var timeToNextSpawn = fps;
var timeTakenToSpawn = 0;

var outOfBounds = -100;

var noOfZombies = 0;

var tacklesMade = 0;
var tacklesMadeInLevel = 0;
var missedZombies = 0;
var missedZombiesInLevel = 0;

var levelNumber = 1;

var posClass = ['leftPos', 'middlePos', 'rightPos'];
var posValues = [40, 240, 440];

var maxNumberOfZombies = 10;

var somethingWrong = false;
var whatsWrong = '';

var devToolsOpened = false;

var problemArray = [0,0,0,0,0,0,0,0,0,0,0,0]

function updateTacklesMade() {
    tacklesMade++;
    tacklesMadeInLevel++;
    $('.tacklesMade').html(tacklesMade);
    saveEvent();
}

function updateMissedZombies() {
    missedZombies++;
    missedZombiesInLevel++;
    $('.missedZombies').html(missedZombies);
    saveEvent();
}

function startGame() {
    loop = setInterval(mainLoop, (1000 / fps));
}

function checkEndGame() {
    if (missedZombies >= 3) {
        endGame();
        console.log(whatsWrong);
    } else if (tacklesMadeInLevel + missedZombiesInLevel >= maxNumberOfZombies) {
        showPopup();
        console.log(whatsWrong);
    }
}

function showPopup() {
    clearInterval(loop);
    saveScore(tacklesMade, 0, levelNumber);
    saveEvent();
    $('#questionDialog').show();
}

function endGame() {
    clearInterval(loop);
    saveScore(tacklesMade, 0, levelNumber);
    saveEvent();
}

function resetGame() {
    maxNumberOfZombies += 10;
    tacklesMadeInLevel = 0;
    missedZombiesInLevel = 0;
    levelNumber++;
    noOfZombies = 0;
    timeTakenToSpawn = 0;
    timeToNextSpawn = fps;

    $('.levelNumberText').html(levelNumber);

    startGame();
}

function checkHealth() {
    if (missedZombies > 3 || missedZombiesInLevel > 3) {
        saveProblem(' Missed too many zombies.', 0);
        missedZombies = 3;
        missedZombiesInLevel = 3;
    }
    if (missedZombies < 0 || missedZombiesInLevel < 0) {
        saveProblem(' Incorrect missed tackles.', 1);
        missedZombies = 0;
    }
    if (tacklesMadeInLevel > levelNumber * 10) {
        saveProblem(' Made too many tackles.', 2);
        tacklesMadeInLevel = maxNumberOfZombies;
    }
    if (timeToNextSpawn > fps) {
        saveProblem(' Zombies spawning too slow.', 3);
        timeTakenToSpawn = fps;
    }
    if (outOfBounds !== -100) {
        saveProblem(' Game area changed.', 4);
        outOfBounds = -100;
    }
    if (noOfZombies > maxNumberOfZombies) {
        saveProblem(' Too many zombies.', 5);
        noOfZombies = maxNumberOfZombies;
    }
    if (noOfZombies < 0) {
        saveProblem(' Incorrect number of zombies.', 6);
        noOfZombies = 0;
    }
    if (levelNumber * 10 !== maxNumberOfZombies) {
        saveProblem(' Incorrect maximum number of zombies.', 7);
    }
    if (timeTakenToSpawn > timeToNextSpawn) {
        saveProblem(' Zombies spawning too slow.', 8);
        timeTakenToSpawn = timeToNextSpawn;
    }
    for (i = 0; i < zombies.length; i++) {
        if (zombies[i].speed < -500) {
            saveProblem(' Zombies spawning too fast.', 9);
            zombies[i].speed = -500;
        }
        if (-200 < zombies[i].speed) {
            saveProblem(' Zombies spawning too slow.', 10);
            zombies[i].speed = -200;
        }
    }
    if (window.devtools.open) {
        saveProblem(' Devtools opened.', 11);
        if (!devToolsOpened) {
            console.log('We are watching 0.0!');
            devToolsOpened = true;
        }
        
    }
}

function saveProblem(_message, _id) {
    if (problemArray[_id] === 0) {
        whatsWrong += _message;
        problemArray[_id] = 1;
    }
    somethingWrong = true;
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
    checkHealth();
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
    
    $('#questionDialogButton').click(function () {
        $('#questionDialog').hide();
        resetGame();
    });

    $(this).keydown(function (e) {
        e.preventDefault();
        checkKeyPress(e);
    });

	startGame();
});
