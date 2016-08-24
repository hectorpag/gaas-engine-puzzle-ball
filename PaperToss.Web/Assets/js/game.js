/* 
Player positions:
     left - 50px
     middle - 250px
    right - 450px
    
Ball positions:
    left - 30px
    middle - 290px
    right - 530px
*/

// Post game variables
var score = 0; // Number of balls dodged
var movement = 0; // Number of times the player has moved
var ballThrown = [0, 0, 0]; // Number of times each ball has been thrown
var ballEnd = [0, 0, 0]; // Number of times a ball has ended in each spot
var ballThrownHistory = ""; // The order of which the balls are thrown 
var ballEndHistory = ""; // The order of which the balls end 
var initialTime, endTime;
var posHistory = [0, 0, 0];

// Pre game variables
var time = 2000; // Starting time between throws
var speed = 1200; // Time it takes for a throw
var startSpin = 0.66; // The percentage of time for when the ball starts spinning
var timeMod = 0.85; // Percentage to reduce time between throws
var minSpeed = 50; // Minimum duration of throw
var speedMod = 20; // Number to reduce speed by

// Pre game placements
var playerPixels = [50, 250, 450]; // The three different left pixels
var movementAmount = 200; // The number of pixels the player moves (usually width of player asset)
var playerPos = 2; // Initial position of avatar (out of 3)
var ballStarts = [30, 280, 530]; // Initial placements of balls in pixels
var ballTopStarts = [360, 320, 340];
var topPos = 280; // Initial top pixels of balls
var ballSize = 40;

// Other variables
var ballLoop;
var startTime = time;
var hit = false;
var leftPos = playerPixels[playerPos - 1]; // Initial left pixels of avatar
var lives = 100;
var started = false;
var hundreds = "0";
var tens = "0";
var asdf = 0;
var opened = false;
var countdown = 3;

var tempArray = [0, 0, 0];

$(document).ready(function() {
    noScroll(); // Stop game moving when swiping
    document.body.focus();
    setTimeout(startCountdown, 1000);

    document.onkeydown = checkKeyPress; // Check when players uses arrow key

    $(".leftButton").on("touchstart mousedown", function(e) {
        e.preventDefault();
        if (leftPos > playerPixels[0]) {
            movePlayer(-movementAmount, -1);
        }
    });

    $(".rightButton").on("touchstart mousedown", function(e) {
        e.preventDefault();
        if (leftPos < playerPixels[2]) {
            movePlayer(movementAmount, 1);
        }
    });
});

function startCountdown() {
    if (countdown > 1) {
        countdown--;
        $(".number").html(countdown);
        setTimeout(startCountdown, 1000);
    } else {
        countdown--;
        $(".number")
            .css({
                'font-size': "200px",
                'line-height': "180px"
            });
        $(".number").html("GO!");
        $(".number")
            .fadeOut(1500,
                function() {
                    $(".number")
                        .css({
                            'opacity': "0",
                            'visibility': "hidden",
                            'display': "none"
                        });
                });
        initialiseGame();
    }
}

function initialiseGame() {
    var d = new Date();
    initialTime = d.getTime();
    ballLoop = setTimeout(throwBall, time); // Start throwing
    startGame(); // Start game api
    started = true;
}

// Finds what key was pressed (left or right arrow) and then calls movePlayer
function checkKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == "37" && leftPos > playerPixels[0]) {
        movePlayer(-movementAmount, -1);
    } else if (e.keyCode == "39" && leftPos < playerPixels[2]) {
        movePlayer(movementAmount, 1);
    }
}

// Moves player according into one of the three positions
function movePlayer(pixelAmount, playerChange) {
    if (!hit) {
        leftPos += pixelAmount;
        playerPos += playerChange;
        $(".player").css({
            "left": leftPos
        });
        if (playerPos === 1) {
            $(".player").css({
                "transform": "rotate(45deg)",
                "transform-origin": "50% 50%"
            });
        } else if (playerPos === 3) {
            $(".player").css({
                "transform": "rotate(-45deg)",
                "transform-origin": "50% 50%"
            });
        } else {
            $(".player").css({
                "transform": "rotate(0deg)",
                "transform-origin": "50% 50%"
            });
        }
        movement++;
        $(".moves").html(movement);
    }
}

// Check to see if player use devtools or something similar open
function isInspectOpen() {
    if (window.devtools.open) {
        opened = window.devtools.open;
    }
}

// Makes the ball move from starting position
function throwBall() {
    isInspectOpen();
    posHistory[playerPos - 1]++;
    var endThrow;
    var ran = randInt(3, 1);
    if (ran === 1) {
        var ranEnd = 3;
    } else if (ran === 2) {
        var ranEnd = 2;
    } else {
        var ranEnd = 1;
    }
    
    endThrow = ballStarts[ranEnd - 1];

    $(".ball" + ran).css({
        'opacity': "1"
    });

    $(".ball" + ran).velocity({
        'top': "805px",
        'width': "100px",
        'height': "100px",
        'left': [(endThrow) + "px", "linear"]
    }, {
        easing: "linear",
        duration: speed,
        complete: function() {
            checkHit(ranEnd, ran);
            if (hit) {
                $(this).stop();
                bounceOff(ran);
            } else {
                resetBall(ran);
            }
        }
    });
}

// Logs which ball was thrown and where it was thrown to
function logBall(ranEnd, ran) {
    ballThrown[ran - 1]++;
    ballEnd[ranEnd - 1]++;
    ballThrownHistory += "" + ran + "";
    ballEndHistory += "" + ranEnd + "";
}

// Checks whether ball and player are in the same square
function checkHit(ballPos, ran) {
    logBall(ballPos, ran);
    if (playerPos === ballPos) {
        score++;
        showScore();
        asdf += 3.754;
        $(".ball" + ran).stop();
    } else {
        $(".ball" + ran).stop();
        gameOver();
    }
}

// Animation of the ball bouncing off the player
function bounceOff(ran) {
    $(".ball" + ran)
        .velocity({
            'top': "550px",
            'width': "65px",
            'height': "65px",
            'opacity': ["0", "easeInExpo"]
        },
        {
            duration: speed,
            easing: "linear",
            complete: function() {
                resetBall(ran);
            }
        });
}

// Works out what digits to show for score
function showScore() {
    if (score > 9) {
        tens = "";
    }
    if (score > 99) {
        hundreds = "";
    }
    $(".score").html(hundreds + tens + score);
}

// Moves ball back to starting position
function resetBall(ran) {
    $(".ball")
        .css({
            'width': ballSize + "px",
            'height': ballSize + "px",
            'opacity': "0"
        });
    $(".ball" + ran)
        .css({
            'top': ballTopStarts[ran - 1] + "px",
            'left': ballStarts[ran - 1] + "px"
        });

    if (lives > 0) {
        makeHarder();
        ballLoop = setTimeout(throwBall, time);
    }
}

// Change time and speed to make game harder
function makeHarder() {
    time = time * timeMod;
    if (time < 100) {
        time = 100;
    }
    if (speed > minSpeed) {
        speed -= speedMod;
    }
}

// What to do at the end of the game
function gameOver() {
 
    hit = true;
    var d = new Date();
    endTime = d.getTime();
    //$(".player").css("background-image", "url(../../../Assets/images/" + boyOrGirl +  "Hit.png)");
    lives--;
    $(".lives").html(lives);

    showScore();

    // Post Scores
    saveScore();

    saveVariables();
  
}