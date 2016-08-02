using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DodgeBall.App_Start.Routes
{
    public class Home
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
               name: "home",
               url: "home/{campaignKey}/{panelId}/{consumerId}",
               defaults: new { controller = "Home", action = "Index", panelId = UrlParameter.Optional, consumerId = UrlParameter.Optional }
           );
          
        }
    }
}