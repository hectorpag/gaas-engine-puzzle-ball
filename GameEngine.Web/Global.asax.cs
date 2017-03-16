using System.Configuration;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using GameEngineApp_Start;
using GameEngine.Service;
using GameEngine.Service.Configuration;
using GameEngine.Web;

namespace GameEngine.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AntiForgeryConfig.SuppressXFrameOptionsHeader = true;
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutofacConfig.Run();
            AutoMapperConfiguration.RegisterMappings();
            GameEngineConfig.Set(ConfigurationManager.AppSettings);
            ActivitiesConfig.StartActivitiesHelper();
        }
        protected void Application_OnError()
        {
            var exception = Server.GetLastError();
            Elmah.ErrorSignal.FromCurrentContext().Raise(exception);
        }
    }
}
