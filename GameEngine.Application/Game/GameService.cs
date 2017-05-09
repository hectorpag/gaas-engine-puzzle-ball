using GameEngine.ViewModel;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using Helper;
using GameEngine.Service.Config;
using GameEngine.Service.Consumer;
using GameEngine.Service.Fuel;
using GameEngine.Service.GamePlay;
using Newtonsoft.Json;
using GameEngine.Service.Score;
//using GaasPlay.Activities;
using System.Linq;
using GameEngine.Service.GameEventData;

namespace GameEngine.Service.Game
{
    public class GameService : IGameService
    {
        private readonly IConfigService _configService;
        private readonly IConsumerService _consumerService;
        private readonly IGamePlayService _gamePlayService;
        private readonly IGameEventDataService _gameEventDataService;
        private readonly IFuelService _fuelService;
        private readonly IScoreService _scoreService;

        public GameService(
            IConfigService configService, 
            IConsumerService consumerService, 
            IGamePlayService gamePlayService, 
            IGameEventDataService gameEventDataService,
            IFuelService fuelService, 
            IScoreService scoreService)
        {
            _configService = configService;
            _consumerService = consumerService;
            _gamePlayService = gamePlayService;
            _gameEventDataService = gameEventDataService;
            _fuelService = fuelService;
            _scoreService = scoreService;
        }

        #region Implementation of IGameService

        public GameViewModel Load(GaasInfoViewModel gaasInfoViewModel)
        {
            var configs = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey);
            var config = configs.FirstOrDefault(c => c.GaasCampaignKey == gaasInfoViewModel.CampaignKey && c.GaasPanelId == gaasInfoViewModel.PanelId);
            if (config == null) return new GameViewModel(); //TODO : Not sure if this is right

            var consumer = !string.IsNullOrEmpty(gaasInfoViewModel.ConsumerId) ? _consumerService.CheckConsumer(gaasInfoViewModel) : new ConsumerViewModel();

            var dashboard = _gamePlayService.LoadScoresForDashboard(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);

            return new GameViewModel() {
                                         Config = config, Consumer = consumer,
                                         HostUrl = Constants.HostUrl,
                                         GaasBaseUrl = Constants.GaasBaseUrl,
                                         TotalLevels = configs.Count(),
                                         Dashboard = dashboard
                                        };
        }

        public int PostScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel)
        {
            //var consumer = _consumerService.CheckConsumer(gaasInfoViewModel);
            var gameViewModel = Load(gaasInfoViewModel);

            //Populate ConsumerId
            gamePlayViewModel.ConsumerId = gameViewModel.Consumer.Id.ToString();

            //Get the fuelID that this score needs to be added to 
            var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
            gamePlayViewModel.FuelId = currentFuel.Id;

            _gamePlayService.Add(gamePlayViewModel);

            var configs = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey);
            var lastLevel = configs.Max(c => c.LevelNumber);
            var totalLevels = configs.Count();
            //Check if last Level
            if (gamePlayViewModel.LevelPlayed == lastLevel.Value)
            {
                var uniqueGamesPlayed = _gamePlayService.GetUniqueByFuelId(gameViewModel.Consumer.Id, currentFuel.Id);
                //check if all level played & Post to LeaderBoard
                List<int> levelIds = configs.Where(c => c.LevelNumber != null).Select(c => c.LevelNumber ?? 0).ToList();
                //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == totalLevels)
                {
                    //Mark fuel as utilized 
                    currentFuel.UtilizedDate = DateTime.UtcNow;
                    _fuelService.Add(currentFuel);

                    var data = new List<GaasScoreViewModel>();
                    var finalData = new List<GaasScoreViewModel>();
                    foreach (var game in uniqueGamesPlayed)
                    {
                        var panelConfig = configs.FirstOrDefault(c => c.LevelNumber == game.LevelPlayed);
                        if (panelConfig == null) continue;
                        data.Add(new GaasScoreViewModel()
                        {
                            storypanel_id = panelConfig.GaasPanelId,
                            key = "score",
                            value = game.Score.ToString(CultureInfo.InvariantCulture)
                        });

                        if (game.LevelPlayed == lastLevel.Value)
                        {
                            //add total score
                            finalData.Add(new GaasScoreViewModel()
                            {
                                storypanel_id = panelConfig.GaasPanelId,
                                key = "score",
                                value = data.Sum(x => x.value.GetDecimal()).ToString()
                            });
                        }
                    }

                    _scoreService.Add(new ScoreViewModel()
                    {
                        ConsumerId = gameViewModel.Consumer.Id,
                        Scored = DateTime.UtcNow,
                        Result = Convert.ToInt32(data.Sum(x => x.value.GetDecimal()))
                    });
                    //try
                    //{
                    //    ActivitiesClientHelper.PostCampaignActivity(ActivityType.CAMPAIGN_GAMES_PLAYED, gameViewModel.Consumer.GaasConsumerId, gaasInfoViewModel.CampaignKey, currentFuel.Id.ToString());
                    //}
                    //catch
                    //{
                    //    ; //TODO: report error
                    //}

                }
                else
                {
                    //Log error or alert
                }
            }

            return 1;
        }

        public void SaveScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel)
        {
            var gameViewModel = Load(gaasInfoViewModel);

            //Populate ConsumerId
            gamePlayViewModel.ConsumerId = gameViewModel.Consumer.Id.ToString();

            //Get the fuelID that this score needs to be added to 
            var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
            if (currentFuel == null) return;

            gamePlayViewModel.FuelId = currentFuel.Id;

            _gamePlayService.Add(gamePlayViewModel);
        }

        public void SaveEventData(GaasInfoViewModel gaasInfoViewModel, GameEventViewModel vm)
        {
            var gameViewModel = Load(gaasInfoViewModel);

            //Populate ConsumerId
            vm.ConsumerId = gameViewModel.Consumer.Id.ToString();

            //Get the fuelID that this score needs to be added to 
            var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
            if (currentFuel == null) return;

            vm.FuelId = currentFuel.Id;
            vm.EventDate = DateTime.UtcNow;

            _gameEventDataService.Add(vm);
        }

        public void SaveFinalScore(GaasInfoViewModel gaasInfoViewModel, GameOverViewModel gamePlayViewModel)
        {
            
        }

        public decimal Score(GaasInfoViewModel gaasInfoViewModel)
        {
            //var consumer = _consumerService.CheckConsumer(gaasInfoViewModel);
            var gameViewModel = Load(gaasInfoViewModel);

            //Populate ConsumerId
            //  gamePlayViewModel.ConsumerId = gameViewModel.Consumer.Id;

            //Get the fuelID that this score needs to be added to 
            var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
            //  gamePlayViewModel.FuelId = currentFuel.Id;

            //    _gamePlayService.Add(gamePlayViewModel);

            var configs = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey);
            var lastLevel = configs.Max(c => c.LevelNumber);
            var totalLevels = configs.Count();
            if (gameViewModel.Config.ShowResult)
            {
                var uniqueGamesPlayed = _gamePlayService.GetUniqueByFuelId(gameViewModel.Consumer.Id, currentFuel.Id);
                //check if all level played & Post to LeaderBoard
                List<int> levelIds = configs.Where(c => c.LevelNumber != null).Select(c => c.LevelNumber ?? 0).ToList();
                //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == totalLevels)
                {
                    var data = new List<GaasScoreViewModel>();
                    foreach (var game in uniqueGamesPlayed)
                    {
                        var panelConfig = configs.FirstOrDefault(c => c.LevelNumber == game.LevelPlayed);
                        if (panelConfig == null) continue;
                        data.Add(new GaasScoreViewModel()
                        {
                            storypanel_id = panelConfig.GaasPanelId,
                            key = "score",
                            value = game.Score.ToString(CultureInfo.InvariantCulture)
                        });
                    }
                    return data.Sum(x => x.value.GetDecimal()); //data[0].value.GetDecimal();
                }
                else
                {
                    //Log error or alert
                }
            }

            return 0;
        }

        public void ClearAllCache()
        {
            _configService.ClearAllCache();
            _consumerService.ClearAllCache();
        }

        #endregion
    }

    public interface IGameService
    {

        GameViewModel Load(GaasInfoViewModel gaasInfoViewModel);
        // GameViewModel LoadConfig(GaasInfoViewModel gaasInfoViewModel);
        // GameViewModel LoadConsumer(GaasInfoViewModel gaasInfoViewModel);
        int PostScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel);
        void SaveScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel);
        void SaveEventData(GaasInfoViewModel gaasInfoViewModel, GameEventViewModel vm);
        void SaveFinalScore(GaasInfoViewModel gaasInfoViewModel, GameOverViewModel gamePlayViewModel);
        decimal Score(GaasInfoViewModel gaasInfoViewModel);

        void ClearAllCache();
    }
}
