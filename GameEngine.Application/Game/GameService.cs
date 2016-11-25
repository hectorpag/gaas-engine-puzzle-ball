using GameEngine.ViewModel;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using Extensions;
using GameEngine.Service.Config;
using GameEngine.Service.Consumer;
using GameEngine.Service.Fuel;
using GameEngine.Service.GamePlay;
using Newtonsoft.Json;
using GameEngine.Service.Score;

namespace GameEngine.Service.Game
{
    public class GameService : IGameService
    {
        private readonly IConfigService _configService;
        private readonly IConsumerService _consumerService;
        private readonly IGamePlayService _gamePlayService;
        private readonly IFuelService _fuelService;
        private readonly IScoreService _scoreService;

        public GameService(IConfigService configService, IConsumerService consumerService, IGamePlayService gamePlayService, IFuelService fuelService, IScoreService scoreService)
        {
            _configService = configService;
            _consumerService = consumerService;
            _gamePlayService = gamePlayService;
            _fuelService = fuelService;
            _scoreService = scoreService;
        }

        #region Implementation of IGameService

        public GameViewModel Load(GaasInfoViewModel gaasInfoViewModel)
        {
            var config = _configService.Get(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.PanelId);
            if (config == null) return new GameViewModel(); //TODO : Not sure if this is right

            var consumer = gaasInfoViewModel.ConsumerId > 0 ? _consumerService.CheckConsumer(gaasInfoViewModel) : new ConsumerViewModel();

            var dashboard = _gamePlayService.LoadScoresForDashboard(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);

            return new GameViewModel() { Config = config, Consumer = consumer, HostUrl = Constants.HostUrl, GaasBaseUrl = Constants.GaasBaseUrl , Dashboard = dashboard};
        }

        public int PostScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel)
        {
            try
            {
                //var consumer = _consumerService.CheckConsumer(gaasInfoViewModel);
                var gameViewModel = Load(gaasInfoViewModel);

                //Populate ConsumerId
                gamePlayViewModel.ConsumerId = gameViewModel.Consumer.Id;

                //Get the fuelID that this score needs to be added to 
                var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
                gamePlayViewModel.FuelId = currentFuel.Id;

                _gamePlayService.Add(gamePlayViewModel);


                //Check if last Level
                if (gamePlayViewModel.LevelPlayed == 3 )
                {
                    var uniqueGamesPlayed = _gamePlayService.GetUniqueByFuelId(gameViewModel.Consumer.Id, currentFuel.Id);
                    //check if all level played & Post to LeaderBoard
                    List<int> levelIds = new List<int> { 1,2,3 };
                    //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                    if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == 3)
                    {
                        //Mark fuel as utilized 
                        currentFuel.UtilizedDate = DateTime.UtcNow;
                        _fuelService.Add(currentFuel);

                        var configs = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey);
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
                        _scoreService.Add(new ScoreViewModel() { ConsumerId = gameViewModel.Consumer.Id, Scored = DateTime.UtcNow, Result = Convert.ToInt32(data.Sum(x=>x.value.GetDecimal())) });


                        //TODO : Update Score Table, it must contain the heighest score of a user. And that can be sent to leaderboard, to reduce the stress submitting all scores on GAAS
                        var rs = Shearnie.Net.Web.RESTJSON.PostSync(Constants.GaasBaseUrl + "/api/v1/gamegallery/loggameresult", new List<KeyValuePair<string, string>>()
                        {
                            new KeyValuePair<string, string>("campaignkey", gaasInfoViewModel.CampaignKey),
                            new KeyValuePair<string, string>("consumerid", gaasInfoViewModel.ConsumerId.ToString()),
                            new KeyValuePair<string, string>("jsonresult", JsonConvert.SerializeObject(data)),
                        });
                    }
                    else
                    {
                        //Log error or alert
                    }
                }

            }
            catch (Exception ex)
            {
                var e = ex;
                throw;
            }
            finally
            {

            }
            return 1;
        }

        public decimal Score(GaasInfoViewModel gaasInfoViewModel)
        {
            try
            {
                //var consumer = _consumerService.CheckConsumer(gaasInfoViewModel);
                var gameViewModel = Load(gaasInfoViewModel);

                //Populate ConsumerId
              //  gamePlayViewModel.ConsumerId = gameViewModel.Consumer.Id;

                //Get the fuelID that this score needs to be added to 
                var currentFuel = _fuelService.CheckFuel(gameViewModel.Consumer.Id);
              //  gamePlayViewModel.FuelId = currentFuel.Id;

            //    _gamePlayService.Add(gamePlayViewModel);


                
                if (gameViewModel.Config.ShowResult)
                {
                    var uniqueGamesPlayed = _gamePlayService.GetUniqueByFuelId(gameViewModel.Consumer.Id, currentFuel.Id);
                    //check if all level played & Post to LeaderBoard
                    List<int> levelIds = new List<int> { 1,2,3 };
                    //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                    if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == 3)
                    {
                        var configs = _configService.GetByCampaign(gaasInfoViewModel.CampaignKey);
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

            }
            catch (Exception ex)
            {
                var e = ex;
                throw;
            }
            finally
            {

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

        decimal Score(GaasInfoViewModel gaasInfoViewModel);

        void ClearAllCache();
    }
}
