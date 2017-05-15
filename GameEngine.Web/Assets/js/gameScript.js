var loopInterval;
var frameCount = 0;
var framesPerWave = 0;
var totalTime = 0;
var startTime = 0;

var timeToNextSpawn = fps * 2;
var timeTakenToSpawn = 0;

var outOfBounds = -100;

var noOfZombies = 0;

var tacklesMade = 0;
var tacklesMadeInLevel = 0;
var missedZombies = 0;
var missedZombiesInLevel = 0;

var levelNumber = 1;

var posClass = ['leftPos', 'middlePos', 'rightPos'];
var posValues = [70, 270, 470];
var zombiePosValues = [70, 270, 470];

var maxNumberOfZombies = 10;

var somethingWrong = false;
var whatsWrong = '';

var devToolsOpened = false;

var problemArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var score = 0;

function updateTacklesMade(_pointsScored) {
    score += _pointsScored;
    tacklesMade++;
    tacklesMadeInLevel++;
    $('.tacklesMade').html(score);
    if (player.status === 'alive') {
        saveEvent();
    }
}

function updateMissedZombies() {
    missedZombies++;
    missedZombiesInLevel++;
    $('.missedZombies').html(missedZombies);
    if (player.status === 'alive') {
        saveEvent();
    }
}

function startGame() {
    $('.waveNumber').html(levelNumber);
    $('.wave').fadeIn(500);
    $('.wave').fadeOut(5000);
    startTime = new Date().getTime();
    framesPerWave = 0;

    setTimeout(function () {
        loopInterval = setInterval(mainLoop, (1000 / fps));
    }, 2000);
    
}

function checkEndGame() {
    if (missedZombies >= 3 && player.status == 'alive') {
        endGame();
    } else if (tacklesMadeInLevel + missedZombiesInLevel >= maxNumberOfZombies) {
        //debugger;
        showPopup();
        
    }
}

function showPopup() {
    clearInterval(loopInterval);
    saveScore(score, 0, levelNumber);
    saveEvent();

    if ($('#questionId').val() > 0) {
        $('#questionDialog').fadeIn();
    } else {
        resetGame();
    }
}

function loadNextQuestion() {
    getNextQuestion(function (data) {
        if (data.QuestionId === 0) {
            $('#questionId').val(0);
            $('#questionContent').html('');
            $('#questionResponses').html('');
            return;
        }
        $('#questionId').val(data.QuestionId);
        $('#questionContent').html(data.Question);
        $('#questionResponses').html('');
        var i = 0;
        $.each(data.Responses, function (key, value) {
            var qdiv = document.createElement('div');
            i++;
            $(qdiv).append('<input type="radio" name="Answer" value="' + key + '" id="answerInput' + i + '" required />');
            $(qdiv).append('<label for="answerInput' + i + '">' + value + '</label>');
            $('#questionResponses').append(qdiv);
        });
    });
}

function endGame() {
    if (player.status == 'alive') {
        player.status = 'dead';
        saveEvent();
        postFinalScore(levelNumber, score);
        saveScore(score, 0, levelNumber);
        setTimeout(function () {
            clearInterval(loopInterval);
        }, 3000);
        player.kill();
        $('body, html').fadeTo(3000, 0, function () {
            gotoResultPage(levelNumber, score);
        });
    }
}

function resetGame() {
    maxNumberOfZombies += 10;
    tacklesMadeInLevel = 0;
    missedZombiesInLevel = 0;
    levelNumber++;
    noOfZombies = 0;
    timeTakenToSpawn = 0;
    timeToNextSpawn = fps * 2;

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
    if (timeToNextSpawn > fps * 2) {
        saveProblem(' Zombies spawning too slow.', 3);
        //timeTakenToSpawn = fps * 2;
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
        if (-150 < zombies[i].speed) {
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
    // My attempt so far at creating variable frame rate
    /*var currentTime = new Date().getTime();
    totalTime = currentTime - startTime;
    var currentFrameRate = framesPerWave / (totalTime / 1000);
    if (totalTime > 1000) {
        totalTime = 0;
        startTime = new Date().getTime();
        framesPerWave = 0;
    }
    if (currentFrameRate < fps * 0.9) {
        saveProblem(' Performance is slow.', 11);
    }*/
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
    framesPerWave++;
    timeTakenToSpawn++; 
    
    player.slidePlayer();
    
    if (timeTakenToSpawn >= timeToNextSpawn) {
        timeTakenToSpawn = 0;
        createZombies();
        if (timeToNextSpawn > 10) {
            timeToNextSpawn -= 1;
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
    loadNextQuestion();
    
    $('#questionDialogButton').click(function () {
        answerQuestion(
            $('#questionId').val(),
            $('input[name=Answer]:checked').val(),
            function() {
                loadNextQuestion();
            });
        $('#questionDialog').hide();
        resetGame();
    });

    $(this).keydown(function (e) {
        e.preventDefault();
        checkKeyPress(e);
    });

    $(".leftButton").on("touchstart mousedown", function (e) {
        e.preventDefault();
        player.movePlayer(-1);
    });

    $(".rightButton").on("touchstart mousedown", function (e) {
        e.preventDefault();
        player.movePlayer(1);
    });

	startGame();
});
