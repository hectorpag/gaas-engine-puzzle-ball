﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using PaperToss.Service;
using PaperToss.Service.Config;
using PaperToss.Service.Consumer;
using PaperToss.Service.Fuel;
using PaperToss.Service.Game;
using PaperToss.Service.GameDataCapture;
using PaperToss.Service.GamePlay;
using PaperToss.ViewModel;
using Extensions;
using Microsoft.ApplicationInsights;
using Newtonsoft.Json;

namespace PaperTossWeb.Controllers.api
{
    public class GameLogController : ApiController
    {
        private readonly IGameDataCaptureService _gameDataCaptureService;
        public GameLogController(IGameDataCaptureService gameDataCaptureService)
        {
            _gameDataCaptureService = gameDataCaptureService;
        }

        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task Start(Object formData)
        {
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
            var gameDataCaptureViewModel = JsonConvert.DeserializeObject<GameDataCaptureViewModel>(formData.ToString());
            gameDataCaptureViewModel.CreatedOn = DateTime.UtcNow;
            await Task.FromResult<int>(_gameDataCaptureService.Add(gameDataCaptureViewModel));
        }


        // POST api/<controller>
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task CustomEvent(Object formData)
        {
            var eventData = JsonConvert.DeserializeObject<CustomEventViewModel>(formData.ToString());
            var data = new Dictionary<string, string> {{"ConsumerId", eventData.ConsumerId}, {"Score", eventData.Score}};
            var telemertyClient = new TelemetryClient();
            telemertyClient.TrackEvent(eventData.CustomEvent, data);
            await Task.FromResult<int>(1);
        }


    }
}