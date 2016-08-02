var qkey = "";
var qrs = "";
var correctPicked = false;

var PostScore = function (level, score, callback) {
    $.post(POST_SCORE_ENDPOINT,
        {
            campaignkey: CAMPAIGN_KEY,
            panelId: PANEL_ID,
            gaasConsumerId: GAAS_CONSUMER_ID,
            score: score,
            level: level
        },
        function (data) {
            callback(data);
        },
        "json");
};


function LoadNextQuestion(nextLevelCallback) {
    nextLevelCallback();
    /*
    getTime();
    $.post(nextq_endpoint, null, function (data) {
        qkey = data.Key;
        if (!qkey) qkey = '';
        qrs = '';
        $('#question-text').html(data.QuestionText);
        var answers = '';
        $.each(data.Answers, function (i, a) {
            var correct = a.Correct ? 'correct' : '';
            answers += '<a class="answer ' + correct + ' question-response" data-val="' + a.Text
                    + '" data-correct="' + correct + '" style="padding-top:2.15%;padding-bottom:2.25%;margin-left:2%;margin-right:2%;">'
                    + a.Text + '</a>';
        });

        $('#question-answers').html(answers);
        
        if (qkey !== '') {
            PopupOverlay();
            $('.submit-time').removeClass('disabled');
        } else {
            setTimeout(function () {
                nextLevelCallback();
            }, 1000);
        }
    }, 'json');
    */
}

function LoadNextTip() {
    getTime();
    $.post(nextt_endpoint,
        null,
        function (data) {
            qkey = data.Key;
            qrs = "";
            $("#tip-text")
                .html('<p class="dyk font-scaling" data-font-size="0.026" data-line-height="0.03">' +
                    data.QuestionText +
                    "</p>");


            $(".dialog1").hide();
            $(".dialog2").show();
            PopupOverlay();
            $(".submit-time").removeClass("disabled");
        },
        "json");
}

function PostResponse() {
    $.post(postresponse_endpoint,
        {
            key: qkey,
            response: qrs
        },
        function (data) {
        },
        "json");
}


function startGame() {
    console.log('Game Started');
    console.log(initialTime);
    var GameData = {};
    GameData.Start = initialTime;
    GameData.Campaignkey = CAMPAIGN_KEY;
    GameData.ConsumerId = GAAS_CONSUMER_ID;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": STARTENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify(GameData)
    }
    $.ajax(settings).done();

}

function saveScore() {

}

function saveVariables() {

    var gameStatsData = {
        "Movement": movement,
        "BallThrown": ballThrown,
        "BallEnd": ballEnd,
        "BallThrownHistory": ballThrownHistory,
        "BallEndHistory": ballEndHistory,
        "Time": time,
        "Speed": speed,
        "Asdf": asdf,
        "EndTime": endTime,
        "Opened": opened,
        "PlayerPos": playerPos,
        "PosHistory": posHistory
    };
    var GameData = {};
    GameData.Start = initialTime;
    GameData.Campaignkey = CAMPAIGN_KEY;
    GameData.ConsumerId = GAAS_CONSUMER_ID;
    GameData.Finished = JSON.stringify(gameStatsData);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": FINISHENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify(GameData)
    }
    $.ajax(settings).done(function () {
        $("#score").val(score);
        $("form").submit();
    }).error(function () {
        $("#score").val(score);
        $("form").submit();
    });
}

$(document)
    .ready(function () {
        $("body")
            .on("click",
                "a.question-response",
                function () {
                    $(".question-pick-prompt")
                        .fadeOut("slow",
                            function () {
                                $(".question-pick-prompt").hide();
                            });
                    $(".incorrect-answer-prompt")
                        .fadeOut("slow",
                            function () {
                                $(".incorrect-answer-prompt").hide();
                            });

                    qrs = ($(this).attr("data-val"));
                    correctPicked = ($(this).attr("data-correct") === "correct");

                    var numCorrect = 0;
                    $("#question-answers > a")
                        .each(function (el) {
                            numCorrect += ($(this).attr("data-correct") === "correct");
                            $(this).removeClass("answer-selected");
                        });

                    $(this).addClass("answer-selected");

                    if (numCorrect === 0) correctPicked = true;
                });
    });