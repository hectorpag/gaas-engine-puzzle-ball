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

function saveScore(score, scoreTime, levelPlayed, doneCallback, failCallback) {
    var gameStatsData = {
        //"Movement": movement,
        //"BallThrown": ballThrown,
        //"BallEnd": ballEnd,
        //"BallThrownHistory": ballThrownHistory,
        //"BallEndHistory": ballEndHistory,
        //"Time": time,
        //"Speed": speed,
        //"Asdf": asdf,
        //"EndTime": endTime,
        //"Opened": opened,
        //"PlayerPos": playerPos,
        //"PosHistory": posHistory
    };
    var gameData = {
        //Start = initialTime,
        CampaignKey: CAMPAIGN_KEY,
        ConsumerId: GAAS_CONSUMER_ID,
        PanelId: PANEL_ID,
        Finished: JSON.stringify(gameStatsData),
        Score: score,
        ScoreTime: scoreTime,
        LevelPlayed: levelPlayed
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": POSTSCOREENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify(gameData)
    }

    $.ajax(settings).done(function () {
        if (doneCallback) { doneCallback(); }
        //window.parent.postMessage('{"game_play" : "over"}', "*");

    }).fail(function () {
        if (failCallback) { failCallback(); }

    });
}

function saveEvent(doneCallback, failCallback) {
    var gameData = {
        CampaignKey: CAMPAIGN_KEY,
        ConsumerId: GAAS_CONSUMER_ID,
        PanelId: PANEL_ID,
        eventData: {
            levelNumber: levelNumber,
            tacklesMade: tacklesMade,
            tacklesMadeInLevel: tacklesMadeInLevel,
            missedZombies: missedZombies,
            missedZombiesInLevel: missedZombiesInLevel
        }
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": TELEMETRYENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify(gameData)
    }

    $.ajax(settings).done(function () {
        if (doneCallback) { doneCallback(); }

    }).fail(function () {
        if (failCallback) { failCallback(); }

    });
}

function getNextQuestion(doneCallback, failCallback) {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": DCQENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify({
            CampaignKey: CAMPAIGN_KEY,
            ConsumerId: GAAS_CONSUMER_ID,
            PanelId: PANEL_ID
        })
    }).done(function (data) {
        if (doneCallback) { doneCallback(data); }

    }).fail(function () {
        if (failCallback) { failCallback(); }

    });
}

function answerQuestion(questionId, question, answer, doneCallback, failCallback) {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": DCAENDPOINT,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": true,
        "data": JSON.stringify({
            CampaignKey: CAMPAIGN_KEY,
            ConsumerId: GAAS_CONSUMER_ID,
            PanelId: PANEL_ID,
            QuestionId: questionId,
            Question: question,
            AnswerValue: answer
        })
    }).done(function (data) {
        if (doneCallback) { doneCallback(data); }

    }).fail(function () {
        if (failCallback) { failCallback(); }

    });
}