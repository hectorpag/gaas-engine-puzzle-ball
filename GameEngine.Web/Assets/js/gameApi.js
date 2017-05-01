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

function saveScore() {

}

function saveVariables() {
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
    var GameData = {};
    //GameData.Start = initialTime;
    GameData.CampaignKey = CAMPAIGN_KEY;
    GameData.ConsumerId = GAAS_CONSUMER_ID;
    GameData.PanelId = PANEL_ID;
    GameData.Finished = JSON.stringify(gameStatsData);
    GameData.Score = tacklesMade;
    GameData.ScoreTime = tacklesMade;
    GameData.LevelPlayed = LEVEL_NUMBER;
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
        window.parent.postMessage('{"game_play" : "over"}', "*");
    }).error(function () {
        $("#score").val(score);
        $("form").submit();
    });
}