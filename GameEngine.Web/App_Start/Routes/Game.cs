using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace GameEngine.App_Start.Routes
{
    public class Game
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                name: "game",
                url: "game/{campaignKey}/{panelId}/{consumerId}",
                defaults: new { controller = "Game", action = "Index", panelId = UrlParameter.Optional, consumerId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "game/ask",
                url: "game/ask/{campaignKey}/{panelId}/{consumerId}",
                defaults: new { controller = "Game", action = "Ask", panelId = UrlParameter.Optional, consumerId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name:  "result",
                url: "result/{campaignKey}/{panelId}/{consumerId}",
                defaults:   new { controller = "Game", action = "Result" }
            );
        }
    }
}
