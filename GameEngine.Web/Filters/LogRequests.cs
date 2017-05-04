using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Serilog;

namespace GameEngine.Web.Filters
{
    public class LogRequests : ActionFilterAttribute
    {
        public LogRequests()
        {
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            Log.Information(
                $"Controller: {filterContext.Controller.ControllerContext.RouteData.Values["controller"]} - " +
                $"Action: {filterContext.Controller.ControllerContext.RouteData.Values["action"]}" 
            );

            base.OnActionExecuted(filterContext);
        }
    }
}