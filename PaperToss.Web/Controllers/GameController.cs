using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http.Formatting;
using System.Web.Mvc;
using DodgeBall.Service;
using DodgeBall.Service.Fuel;
using DodgeBall.Service.Game;
using DodgeBall.ViewModel;
using Extensions;
using Microsoft.ApplicationInsights.Channel;
using Newtonsoft.Json;

namespace DodgeBall.Web.Controllers
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
            var gaasInfoViewModel = new GaasInfoViewModel
            {
                CampaignKey = campaignKey,
                PanelId = Convert.ToInt32(panelId),
                ConsumerId = Convert.ToInt32(consumerId)
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);


            //1.Check Level number
            if (gameViewModel.Config.LevelNumber == 1)
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
        [HttpPost]
        public ActionResult Result(FormCollection formCollection)
        {
            //TODO: Check for errors
            //Make sure that all paramaeters are passed in 
            var gaasInfoViewModel = GetGaasInfoViewModel(formCollection);

            var gamePlayViewModel = GetGamePlayViewModel(formCollection);
            _gameService.PostScore(gaasInfoViewModel, gamePlayViewModel);

            var gameViewModel = _gameService.Load(gaasInfoViewModel);

            var resultViewModel = new ResultViewModel() { GameViewModel = gameViewModel, Score = gamePlayViewModel.Score };
            //log score 
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
                ConsumerId = (formData["gaasConsumerId"]).GetInteger()
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