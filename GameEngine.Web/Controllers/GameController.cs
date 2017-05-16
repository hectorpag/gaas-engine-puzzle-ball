using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Mvc;
using GameEngine.Service;
using GameEngine.Service.Fuel;
using GameEngine.Service.Game;
using GameEngine.ViewModel;
using Helper;
using Microsoft.ApplicationInsights.Channel;
using Newtonsoft.Json;
using GameEngine.Service.Config;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Controllers
{
    public class GameController : Controller
    {
        private readonly IGameService _gameService;
        private readonly IFuelService _fuelService;

        public GameController(IGameService gameService, IFuelService fuelService)
        {
            _gameService = gameService;
            _fuelService = fuelService;
        }

        #region Methods

        // GET: Default
        public ActionResult Index(string campaignKey, string panelId, string consumerId)
        {
            //Logging.Info("Game Home", new
            //{
            //    AppSettings = ConfigurationManager.AppSettings.AllKeys.ToList().ToDictionary(k => k, k => ConfigurationManager.AppSettings[k]),
            //    ConnectionStrings = ConfigurationManager.ConnectionStrings
            //});

            var gaasInfoViewModel = new GaasInfoViewModel
            {
                CampaignKey = campaignKey,
                PanelId = Convert.ToInt32(panelId),
                ConsumerId = consumerId
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);

            if (gameViewModel.Config == null)
                throw new Exception("Config returned null, possible invalid campaign key.");

            //1.Check Level number
            var levelNumber = gameViewModel.Config.LevelNumber ?? 0;
            if (levelNumber == 0 || levelNumber == 1)
            {
                //TODO : Remove this after demo
                _fuelService.ResetUnusedFuel(gameViewModel.Consumer.Id);
                //User is starting to play a new game.Create a new fuel record
                _fuelService.Add(new FuelViewModel() { ConsumerId = gameViewModel.Consumer.Id, Created = DateTime.UtcNow, UtilizedDate = null, AutoDiscard = false });
            }
            //else
            //{
            //    //Get the last fuel record 
            //    _fuelService.CheckFuel(gaasInfoViewModel, gameViewModel.Consumer, gameViewModel.Config.LevelNumber.GetInteger());
            //}

            return View(gameViewModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Result(string campaignKey, string panelId, string consumerId)
        { //TODO: Check for errors
            //Make sure that all paramaeters are passed in 
            var gaasInfoViewModel = new GaasInfoViewModel
            {
                CampaignKey = campaignKey,
                PanelId = Convert.ToInt32(panelId),
                ConsumerId = consumerId
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);

            int score = (int)_gameService.Score(gaasInfoViewModel);

            //var config = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey).Where(x=>x.LevelNumber ==1 && x.ShowMenu).ToList();
            //if (config.Count > 0)
            //{
            //    gameViewModel.Config = config[0];
            //}
            
            var resultViewModel = new ResultViewModel() { GameViewModel = gameViewModel, Score = score };

            return View("Result", resultViewModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Result(FormCollection formCollection)
        {
            var gaasInfoViewModel = new GaasInfoViewModel
            {
                CampaignKey = formCollection["campaignKey"],
                PanelId = Convert.ToInt32(formCollection["panelId"]),
                ConsumerId = formCollection["gaasConsumerId"]
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);
            var resultViewModel = new ResultViewModel()
            {
                GameViewModel = gameViewModel,
                Score = _gameService.GetLastScore(gaasInfoViewModel)
            };
            return View("Result", resultViewModel);
        }
        #endregion

        #region Functions
        [NonAction]
        private static GaasInfoViewModel GetGaasInfoViewModel(FormCollection formData)
        {
            var gaasInfoViewModel = new GaasInfoViewModel()
            {
                CampaignKey = formData["campaignkey"],
                PanelId = (formData["panelId"]).GetInteger(),
                ConsumerId = formData["gaasConsumerId"].ToString()
            };

            return gaasInfoViewModel;
        }

        [NonAction]
        private static GamePlayViewModel GetGamePlayViewModel(FormCollection formData)
        {
            var gamePlayViewModel = new GamePlayViewModel
            {
                PlayedDate = DateTime.UtcNow,
                LevelPlayed = (string.IsNullOrEmpty(formData["level"])) ? 0 : formData["level"].GetInteger(),
                Score = (string.IsNullOrEmpty(formData["score"])) ? 0 : formData["score"].GetInteger()
            };

            return gamePlayViewModel;
        }

        #endregion
    }
}