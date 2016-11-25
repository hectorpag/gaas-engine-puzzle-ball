var levelNumber = LEVEL_NUMBER;

var clickedCards = 0;

var selectedCard1, selectedCard2, maxPairs, picOrder, score, loop, startTime, scoreInterval;
var canClick = true;
var pairs = 0;

var pic1 = '1';
var pic2 = '2';
var pic3 = '3';
var pic4 = '4';
var pic5 = '5';
var pic6 = '6';
var pic7 = '7';
var pic8 = '8';
var pic9 = '9';
var pic10 = '10';

if (levelNumber <= 1) {
    picOrder = [pic1, pic1, pic2, pic2, pic3, pic3, pic4, pic4];
    maxPairs = 4;
    score = 4000;
} else if (levelNumber === 2) {
    picOrder = [pic1, pic1, pic2, pic2, pic3, pic3, pic4, pic4, pic5, pic5, pic6, pic6];
    maxPairs = 6;
    score = 6000;
} else if (levelNumber >= 3) {
    picOrder = [pic1, pic1, pic2, pic2, pic3, pic3, pic4, pic4, pic5, pic5, pic6, pic6, pic7, pic7, pic8, pic8];
    maxPairs = 8;
    score = 8000;
}

var i = 0;
var initialScore = score;

$(document).ready(function () {
    noScroll(); // Stop game moving when swiping
    shuffle(picOrder);

    if (levelNumber <= 1) {
        $('.card1').attr('data-val', picOrder[0]);
        $('.card2').attr('data-val', picOrder[1]);
        $('.card3').attr('data-val', picOrder[2]);
        $('.card4').attr('data-val', picOrder[3]);
        $('.card5').attr('data-val', picOrder[4]);
        $('.card6').attr('data-val', picOrder[5]);
        $('.card7').attr('data-val', picOrder[6]);
        $('.card8').attr('data-val', picOrder[7]);

        $('.card1 .pic').addClass('front' + $('.card1').attr('data-val'));
        $('.card2 .pic').addClass('front' + $('.card2').attr('data-val'));
        $('.card3 .pic').addClass('front' + $('.card3').attr('data-val'));
        $('.card4 .pic').addClass('front' + $('.card4').attr('data-val'));
        $('.card5 .pic').addClass('front' + $('.card5').attr('data-val'));
        $('.card6 .pic').addClass('front' + $('.card6').attr('data-val'));
        $('.card7 .pic').addClass('front' + $('.card7').attr('data-val'));
        $('.card8 .pic').addClass('front' + $('.card8').attr('data-val'));

        $('#smallGrid').show();
    } else if (levelNumber === 2) {
        $('.card1').attr('data-val', picOrder[0]);
        $('.card2').attr('data-val', picOrder[1]);
        $('.card3').attr('data-val', picOrder[2]);
        $('.card4').attr('data-val', picOrder[3]);
        $('.card5').attr('data-val', picOrder[4]);
        $('.card6').attr('data-val', picOrder[5]);
        $('.card7').attr('data-val', picOrder[6]);
        $('.card8').attr('data-val', picOrder[7]);
        $('.card9').attr('data-val', picOrder[8]);
        $('.card10').attr('data-val', picOrder[9]);
        $('.card11').attr('data-val', picOrder[10]);
        $('.card12').attr('data-val', picOrder[11]);
        $('.card13').attr('data-val', picOrder[12]);

        $('.card1 .pic').addClass('front' + $('.card1').attr('data-val'));
        $('.card2 .pic').addClass('front' + $('.card2').attr('data-val'));
        $('.card3 .pic').addClass('front' + $('.card3').attr('data-val'));
        $('.card4 .pic').addClass('front' + $('.card4').attr('data-val'));
        $('.card5 .pic').addClass('front' + $('.card5').attr('data-val'));
        $('.card6 .pic').addClass('front' + $('.card6').attr('data-val'));
        $('.card7 .pic').addClass('front' + $('.card7').attr('data-val'));
        $('.card8 .pic').addClass('front' + $('.card8').attr('data-val'));
        $('.card9 .pic').addClass('front' + $('.card9').attr('data-val'));
        $('.card10 .pic').addClass('front' + $('.card10').attr('data-val'));
        $('.card11 .pic').addClass('front' + $('.card11').attr('data-val'));
        $('.card12 .pic').addClass('front' + $('.card12').attr('data-val'));

        $('#mediumGrid').show();
    } else if (levelNumber >= 3) {
        $('.card1').attr('data-val', picOrder[0]);
        $('.card2').attr('data-val', picOrder[1]);
        $('.card3').attr('data-val', picOrder[2]);
        $('.card4').attr('data-val', picOrder[3]);
        $('.card5').attr('data-val', picOrder[4]);
        $('.card6').attr('data-val', picOrder[5]);
        $('.card7').attr('data-val', picOrder[6]);
        $('.card8').attr('data-val', picOrder[7]);
        $('.card9').attr('data-val', picOrder[8]);
        $('.card10').attr('data-val', picOrder[9]);
        $('.card11').attr('data-val', picOrder[10]);
        $('.card12').attr('data-val', picOrder[11]);
        $('.card13').attr('data-val', picOrder[12]);
        $('.card14').attr('data-val', picOrder[13]);
        $('.card15').attr('data-val', picOrder[14]);
        $('.card16').attr('data-val', picOrder[15]);

        $('.card1 .pic').addClass('front' + $('.card1').attr('data-val'));
        $('.card2 .pic').addClass('front' + $('.card2').attr('data-val'));
        $('.card3 .pic').addClass('front' + $('.card3').attr('data-val'));
        $('.card4 .pic').addClass('front' + $('.card4').attr('data-val'));
        $('.card5 .pic').addClass('front' + $('.card5').attr('data-val'));
        $('.card6 .pic').addClass('front' + $('.card6').attr('data-val'));
        $('.card7 .pic').addClass('front' + $('.card7').attr('data-val'));
        $('.card8 .pic').addClass('front' + $('.card8').attr('data-val'));
        $('.card9 .pic').addClass('front' + $('.card9').attr('data-val'));
        $('.card10 .pic').addClass('front' + $('.card10').attr('data-val'));
        $('.card11 .pic').addClass('front' + $('.card11').attr('data-val'));
        $('.card12 .pic').addClass('front' + $('.card12').attr('data-val'));
        $('.card13 .pic').addClass('front' + $('.card13').attr('data-val'));
        $('.card14 .pic').addClass('front' + $('.card14').attr('data-val'));
        $('.card15 .pic').addClass('front' + $('.card15').attr('data-val'));
        $('.card16 .pic').addClass('front' + $('.card16').attr('data-val'));

        $('#largeGrid').show();
    }

    $('.card').on('touchstart mousedown', function (e) {
        e.preventDefault();

        if (!$(this).hasClass('selected') && canClick) {
            if (clickedCards <= 0) {
                selectedCard1 = e.target.dataset.val;
            }

            if (clickedCards === 1) {
                selectedCard2 = e.target.dataset.val;
            }
            if (clickedCards < 2) {
                clickedCards++;
                e.target.className += " selected";
            }

            if (clickedCards >= 2) {
                //score++;
                //$('.score').html(score);
                if (selectedCard1 === selectedCard2) {
                    pairs++;
                    $('.selected').addClass('correct');
                    $('.selected').removeClass('card selected');
                    clickedCards = 0;
                    selectedCard1 = null;
                    selectedCard2 = null;
                    if (pairs >= maxPairs) {
                        clearInterval(loop);
                        gameOver();
                    }
                } else {
                    initialScore -= 250;
                    score = Math.floor(score);
                    $('.score').html(score);
                    $('.selected').addClass('incorrect');
                    canClick = false;
                    setTimeout(function () {
                        canClick = true;
                        clickedCards = 0;
                        $('.selected').removeClass('selected incorrect');
                    }, 1000);
                }
            }
        }
    });
    startTime = new Date().getTime();
    loop = setInterval(function () {
        changeScore();
    }, 50);
});

function changeScore() {
    if (score > 0) {
        var currentTime = new Date().getTime();
        var timeTaken = (currentTime - startTime) / 10;
        score = initialScore - timeTaken;
        if (score <= 0) {
            score = 0;
        }
        score = Math.floor(score);
        $('.score').html(score);
    } else {
        score = 0;
        $('.score').html(score);
        clearInterval(loop);
        gameOver();
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// What to do at the end of the game
function gameOver() {
    saveVariables();
  
}