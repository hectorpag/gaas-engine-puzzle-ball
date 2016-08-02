using System;
using System.Collections.Generic;
using System.Web.Http;
using DodgeBall.Service;

namespace DodgeBall.Web.Controllers.api.v1
{
    public class EndpointsController : ApiController
    {
        public List<string> GetLeaderboardKeys()
        {
            return new Leaderboard().GetKeys();
        }
    }
}