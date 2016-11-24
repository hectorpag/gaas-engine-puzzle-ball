using System;
using System.Collections.Generic;
using System.Web.Http;
using GameEngine.Service;

namespace GameEngine.Web.Controllers.api.v1
{
    public class EndpointsController : ApiController
    {
        public List<string> GetLeaderboardKeys()
        {
            return new Leaderboard().GetKeys();
        }
    }
}