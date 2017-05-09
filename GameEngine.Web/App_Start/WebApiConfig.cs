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
                name: "api/gamelog/telemetry",
                routeTemplate: "api/gamelog/telemetry",
                defaults: new { controller = "GameLog", action = "Telemetry" }
            );

            config.Routes.MapHttpRoute(
                name: "api/gamelog/gameover",
                routeTemplate: "api/gamelog/gameover",
                defaults: new { controller = "GameLog", action = "GameOver" }
            );

            config.Routes.MapHttpRoute(
                name: "api/dc/getnextquestion",
                routeTemplate: "api/dc/getnextquestion",
                defaults: new { controller = "Dc", action = "GetnextQuestion" }
            );

            config.Routes.MapHttpRoute(
                name: "api/dc/answerquestion",
                routeTemplate: "api/dc/answerquestion",
                defaults: new { controller = "Dc", action = "AnswerQuestion" }
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