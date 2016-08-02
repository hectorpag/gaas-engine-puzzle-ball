using System.Web.Mvc;
using System.Web.Routing;

namespace PaperToss.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            App_Start.Routes.Game.RegisterRoutes(routes);
            App_Start.Routes.Home.RegisterRoutes(routes);
            App_Start.Routes.Config.RegisterRoutes(routes);        
            App_Start.Routes.Reports.RegisterRoutes(routes);
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Game", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
