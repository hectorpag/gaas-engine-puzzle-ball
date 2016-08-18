using PaperToss.ViewModel;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using Extensions;
using PaperToss.Service.Config;
using PaperToss.Service.Consumer;
using PaperToss.Service.Fuel;
using PaperToss.Service.GamePlay;
using Newtonsoft.Json;

namespace PaperToss.Service.Game
{
    public class GameService : IGameService
    {
        private readonly IConfigService _configService;
        private readonly IConsumerService _consumerService;
        private readonly IGamePlayService _gamePlayService;
        private readonly IFuelService _fuelService;

        public GameService(IConfigService configService, IConsumerService consumerService, IGamePlayService gamePlayService, IFuelService fuelService)
        {
            _configService = configService;
            _consumerService = consumerService;
            _gamePlayService = gamePlayService;
            _fuelService = fuelService;
        }

        #region Implementation of IGameService

        public GameViewModel Load(GaasInfoViewModel gaasInfoViewModel)
        {
            var config = _configService.Get(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.PanelId);
            if (config == null) return new GameViewModel(); //TODO : Not sure if this is right

            var consumer = gaasInfoViewModel.ConsumerId > 0 ? _consumerService.CheckConsumer(gaasInfoViewModel) : new ConsumerViewModel();

            return new GameViewModel() { Config = config, Consumer = consumer, HostUrl = Constants.HostUrl, GaasBaseUrl = Constants.GaasBaseUrl };
        }

        public void PostScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel)
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
                if (gamePlayViewModel.LevelPlayed > 0 )
                {
                    var uniqueGamesPlayed = _gamePlayService.GetUniqueByFuelId(gameViewModel.Consumer.Id, currentFuel.Id);
                    //check if all level played & Post to LeaderBoard
                    List<int> levelIds = new List<int> { 1 };
                    //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                    if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == 1)
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
        }

        public int Score(GaasInfoViewModel gaasInfoViewModel)
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
                    List<int> levelIds = new List<int> { 1 };
                    //TODO:// Find a way to make sure that uniqueGamesPlayed containes all levels
                    if (!(uniqueGamesPlayed.Any(x => !levelIds.Contains(x.LevelPlayed))) && uniqueGamesPlayed.Count == 1)
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

                        //TODO : Update Score Table, it must contain the heighest score of a user. And that can be sent to leaderboard, to reduce the stress submitting all scores on GAAS
                        var rs = Shearnie.Net.Web.RESTJSON.PostSync(Constants.GaasBaseUrl + "/api/v1/gamegallery/loggameresult", new List<KeyValuePair<string, string>>()
                        {
                            new KeyValuePair<string, string>("campaignkey", gaasInfoViewModel.CampaignKey),
                            new KeyValuePair<string, string>("consumerid", gaasInfoViewModel.ConsumerId.ToString()),
                            new KeyValuePair<string, string>("jsonresult", JsonConvert.SerializeObject(data)),
                        });

                        return data[0].value.GetInteger();
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

        //public GameViewModel LoadConsumer(GaasInfoViewModel gaasInfoViewModel)
        //{
        //    var consumer = gaasInfoViewModel.ConsumerId > 0 ? _consumerService.CheckConsumer(gaasInfoViewModel) : new ConsumerViewModel();

        //    return new GameViewModel() { Config = null, Consumer = consumer, HostUrl = Constants.HostUrl, GaasBaseUrl = Constants.GaasBaseUrl };
        //}

        #endregion
    }

    public interface IGameService
    {
        GameViewModel Load(GaasInfoViewModel gaasInfoViewModel);
        // GameViewModel LoadConfig(GaasInfoViewModel gaasInfoViewModel);
        // GameViewModel LoadConsumer(GaasInfoViewModel gaasInfoViewModel);
        void PostScore(GaasInfoViewModel gaasInfoViewModel, GamePlayViewModel gamePlayViewModel);

        int Score(GaasInfoViewModel gaasInfoViewModel);

        void ClearAllCache();
    }
}
