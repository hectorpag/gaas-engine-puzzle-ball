using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PaperToss.App_Start.Routes
{
    public class Config
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "config",
                "config/{campaignKey}/{panelId}",
                new { controller = "Config", action = "Index" }
                );

            routes.MapRoute(
                "config-tilemap",
                "config-tilemap/{id}/{campaignKey}/{panelId}",
                new { controller = "Config", action = "TileMap" }
                );

            routes.MapRoute(
               "config-clearcache",
               "config-clearcache/{campaignKey}/{panelId}",
               new { controller = "Config", action = "ClearCache" }
               );
        }
    }
}