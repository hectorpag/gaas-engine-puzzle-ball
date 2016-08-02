using System.Web.Http;

namespace PaperTossWeb
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
                 name: "api/v1/getleaderboardkeys",
                 routeTemplate: "api/v1/getleaderboardkeys",
                 defaults: new { controller = "Endpoints" }
             );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}