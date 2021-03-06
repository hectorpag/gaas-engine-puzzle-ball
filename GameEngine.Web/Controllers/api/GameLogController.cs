﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using GameEngine.Service.Game;
using GameEngine.Service.GameDataCapture;
using GameEngine.Service.GameEventData;
using GameEngine.ViewModel;
using Microsoft.ApplicationInsights;
using Newtonsoft.Json;
using GameEngine.Web.Helpers;
using GaasPlay.Activities;
using GaasPlay.Activities.Client.Model;
using System.Diagnostics;

namespace GameEngine.Web.Controllers.api
{
    public class GameLogController : ApiController
    {
        private readonly IGameDataCaptureService _gameDataCaptureService;
        private readonly IGameService _gameService;

        public GameLogController(
            IGameDataCaptureService gameDataCaptureService, 
            IGameService gameService)
        {
            _gameDataCaptureService = gameDataCaptureService;
            _gameService = gameService;
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task Start(Object formData)
        {
            LogRq("api/gamelog/Start", formData);

            var gameDataCaptureViewModel = JsonConvert.DeserializeObject<GameDataCaptureViewModel>(formData.ToString());
            gameDataCaptureViewModel.CreatedOn = DateTime.UtcNow;
            await Task.FromResult<int>( _gameDataCaptureService.Add(gameDataCaptureViewModel));
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task Finish(Object formData)
        {
            LogRq("api/gamelog/Finish", formData);

            var gameDataCaptureViewModel = JsonConvert.DeserializeObject<GameDataCaptureViewModel>(formData.ToString());
            gameDataCaptureViewModel.CreatedOn = DateTime.UtcNow;
            await Task.FromResult<int>(_gameDataCaptureService.Add(gameDataCaptureViewModel));
            var gaasInfoViewModel = JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString());
            var gamePlayViewModel = JsonConvert.DeserializeObject<GamePlayViewModel>(formData.ToString());

            gamePlayViewModel.PlayedDate = DateTime.UtcNow;

            await Task.FromResult<int>(_gameService.PostScore(gaasInfoViewModel, gamePlayViewModel));
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task SaveScore(Object formData)
        {
            LogRq("api/gamelog/savescore", formData);

            var gaasInfoViewModel = JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString());
            var gamePlayViewModel = JsonConvert.DeserializeObject<GamePlayViewModel>(formData.ToString());
            gamePlayViewModel.PlayedDate = DateTime.UtcNow;

            //Trace.WriteLine(String.Format("zombie: {0} {1} {2} {3} {4}", gaasInfoViewModel.ConsumerId, gaasInfoViewModel.CampaignKey, gamePlayViewModel.LevelPlayed.ToString(), gamePlayViewModel.Score.ToString(), time.ToString()));
            ActivitiesClientHelper.PostActivity(ActivityType.CAMPAIGN_OBJECTIVE,
                gaasInfoViewModel.ConsumerId,
                null,
                gaasInfoViewModel.CampaignKey,
                new List<ActivityValue>() {
                                    new ActivityValue() { Name = "default", Value = "wave complete" },
                                    new ActivityValue() { Name = "wave"  , Value = gamePlayViewModel.LevelPlayed.ToString() },
                                    new ActivityValue() { Name = "score"  , Value = gamePlayViewModel.Score.ToString() },
                                    new ActivityValue() { Name = "date"  , Value = gamePlayViewModel.PlayedDate.ToString() }
                });

            await Task.Run(() => _gameService.SaveScore(gaasInfoViewModel, gamePlayViewModel));
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task Telemetry(Object formData)
        {
            //LogRq("api/gamelog/telemetry", formData);

            await Task.Run(() => _gameService.SaveEventData(
                JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString()), 
                JsonConvert.DeserializeObject<GameEventViewModel>(formData.ToString()))
            );
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task GameOver(Object formData)
        {
            LogRq("api/gamelog/gameover", formData);

            await Task.Run(() => _gameService.SaveFinalScore(
                JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString()),
                JsonConvert.DeserializeObject<GameOverViewModel>(formData.ToString()))
            );
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task CustomEvent(Object formData)
        {
            Logging.Info("api/gamelog/CustomEvent", formData);

            var eventData = JsonConvert.DeserializeObject<CustomEventViewModel>(formData.ToString());
            var data = new Dictionary<string, string> {{"ConsumerId", eventData.ConsumerId}, {"Score", eventData.Score}};
            var telemertyClient = new TelemetryClient();
            telemertyClient.TrackEvent(eventData.CustomEvent, data);
            await Task.FromResult<int>(1);
        }

        private void LogRq(string msg, Object formData)
        {
            Logging.Info(msg, new
            {
                formData = formData,
                AppSettings = ConfigurationManager.AppSettings.AllKeys.ToList().ToDictionary(k => k, k => ConfigurationManager.AppSettings[k]),
                ConnectionStrings = ConfigurationManager.ConnectionStrings
            });
        }
    }
}