using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace GameEngine.App_Start.Routes
{
    public class Reports
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                name: "reports",
                url: "reports",
                defaults: new { controller = "Reports", action = "Index" }
            );

            routes.MapRoute(
               "report-scores",
               "report-scores",
               new { controller = "Reports", action = "Scores" }
               );
        }
    }
}