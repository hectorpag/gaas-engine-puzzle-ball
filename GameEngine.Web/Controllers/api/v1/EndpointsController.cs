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
            Logging.Info("GetLeaderboardKeys");

            return new Leaderboard().GetKeys();
        }

        [AcceptVerbs("POST")]
        [HttpPost]
        public List<PortalLeaderboardGradeListViewModel> GetWinnerResults(FormDataCollection formData)
        {
            Logging.Info("api/GetWinnerResults", formData);

            try
            {
                var lastResetDate = new DateTime();
                var date = formData["lastResetDate"];
                if (!string.IsNullOrEmpty(date))
                    lastResetDate = DateTime.Parse(date);
                return _scoreService.GetLeaderboardScore(formData["campaignKey"], int.Parse(formData["storyPanelId"]), int.Parse(formData["accumulate"]), int.Parse(formData["sortOrder"]), lastResetDate);
            }
            catch(Exception ex)
            {
                Logging.Error(ex);
                return new List<PortalLeaderboardGradeListViewModel>();
            }
        }
    }
}