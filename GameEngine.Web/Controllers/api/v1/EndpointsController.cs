using System;
using System.Collections.Generic;
using System.Web.Http;
using GameEngine.Service;
using GameEngine.Service.Score;
using GaasPlayCore.ViewModel;
using System.Net.Http.Formatting;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Controllers.api.v1
{
    public class EndpointsController : ApiController
    {
        private readonly IScoreService _scoreService;
        public EndpointsController(IScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        public List<string> GetLeaderboardKeys()
        {
            Helpers.Logging.Info("GetLeaderboardKeys");

            return new Leaderboard().GetKeys();
        }

        [AcceptVerbs("POST")]
        [HttpPost]
        public List<PortalLeaderboardGradeListViewModel> GetWinnerResults(FormDataCollection formData)
        {
            Helpers.Logging.Info("api/GetWinnerResults", formData);

            try
            {
                return _scoreService.GetLeaderboardScore(
                    formData["campaignKey"], 
                    int.Parse(formData["storyPanelId"]), 
                    int.Parse(formData["accumulate"]), 
                    int.Parse(formData["sortOrder"]),
                    (!string.IsNullOrEmpty(formData["lastResetDate"])) 
                        ? DateTime.Parse(formData["lastResetDate"]) 
                        : (DateTime?) null);
            }
            catch(Exception ex)
            {
                Helpers.Logging.Error(ex);
                return new List<PortalLeaderboardGradeListViewModel>();
            }
        }
    }
}