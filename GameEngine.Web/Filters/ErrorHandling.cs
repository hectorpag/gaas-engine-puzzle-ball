using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Filters
{
    public class ErrorHandling : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            Logging.Error(filterContext.Exception, "Unhandled: " + filterContext.Exception.Message);
        }
    }
}