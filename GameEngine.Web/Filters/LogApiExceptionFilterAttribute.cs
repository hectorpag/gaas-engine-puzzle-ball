using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Filters
{
    public class LogApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            Logging.Error(context.Exception, "GameEngine.Web Unhandled: " + context.Exception.Message);
        }
    }
}