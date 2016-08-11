using System;
using System.Collections.Generic;
using System.Web.Http;
using PaperToss.Service;

namespace PaperToss.Web.Controllers.api.v1
{
    public class EndpointsController : ApiController
    {
        public List<string> GetLeaderboardKeys()
        {
            return new Leaderboard().GetKeys();
        }
    }
}