using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using GameEngine.Service.Game;
using GameEngine.Service.GameDataCapture;
using GameEngine.ViewModel;
using Microsoft.ApplicationInsights;
using Newtonsoft.Json;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Controllers.api
{
    public class GameLogController : ApiController
    {
        private readonly IGameDataCaptureService _gameDataCaptureService;
        private readonly IGameService _gameService;
        public GameLogController(IGameDataCaptureService gameDataCaptureService, IGameService gameService)
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
            Logging.Info("api/Start", formData);

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
            Logging.Info("api/Finish", formData);

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
            Logging.Info("api/savescore", formData);

            var gameDataCaptureViewModel = JsonConvert.DeserializeObject<GameDataCaptureViewModel>(formData.ToString());
            gameDataCaptureViewModel.CreatedOn = DateTime.UtcNow;
            await Task.FromResult<int>(_gameDataCaptureService.Add(gameDataCaptureViewModel));
            var gaasInfoViewModel = JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString());
            var gamePlayViewModel = JsonConvert.DeserializeObject<GamePlayViewModel>(formData.ToString());

            gamePlayViewModel.PlayedDate = DateTime.UtcNow;

            await Task.Run(() => _gameService.SaveScore(gaasInfoViewModel, gamePlayViewModel));
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task CustomEvent(Object formData)
        {
            Logging.Info("api/CustomEvent", formData);

            var eventData = JsonConvert.DeserializeObject<CustomEventViewModel>(formData.ToString());
            var data = new Dictionary<string, string> {{"ConsumerId", eventData.ConsumerId}, {"Score", eventData.Score}};
            var telemertyClient = new TelemetryClient();
            telemertyClient.TrackEvent(eventData.CustomEvent, data);
            await Task.FromResult<int>(1);
        }
    }
}