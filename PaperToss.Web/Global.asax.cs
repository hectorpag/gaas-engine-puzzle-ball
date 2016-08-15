using System.Configuration;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using PaperTossApp_Start;
using PaperToss.Service;
using PaperToss.Service.Configuration;
using PaperToss.Web;

namespace PaperToss.Web
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
            PaperTossConfig.Set(ConfigurationManager.AppSettings);
        }
        protected void Application_OnError()
        {
            var exception = Server.GetLastError();
            Elmah.ErrorSignal.FromCurrentContext().Raise(exception);
        }
    }
}
