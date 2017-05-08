using System.Web.Http;

namespace GameEngine.Web
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "api/gamelog/start",
                routeTemplate: "api/gamelog/start",
                defaults: new { controller = "GameLog", action = "Start" }
            );

            config.Routes.MapHttpRoute(
                name: "api/gamelog/finish",
                routeTemplate: "api/gamelog/finish",
                defaults: new { controller = "GameLog", action = "Finish" }
            );

            config.Routes.MapHttpRoute(
                name: "api/gamelog/customevent",
                routeTemplate: "api/gamelog/customevent",
                defaults: new { controller = "GameLog", action = "CustomEvent" }
            );

            config.Routes.MapHttpRoute(
                name: "api/dc/getnextquestion",
                routeTemplate: "api/dc/getnextquestion",
                defaults: new { controller = "Dc", action = "GetnextQuestion" }
            );

            config.Routes.MapHttpRoute(
                name: "api/v1/getleaderboardkeys",
                routeTemplate: "api/v1/getleaderboardkeys",
                defaults: new { controller = "Endpoints", action = "GetLeaderboardKeys" }
            );

            config.Routes.MapHttpRoute(
                name: "api/v1/getwinnerresults",
                routeTemplate: "api/v1/getwinnerresults",
                defaults: new { controller = "Endpoints", action = "GetWinnerResults" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}