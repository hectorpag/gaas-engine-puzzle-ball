using System.Web.Mvc;
using GameEngine.Web.Filters;

namespace GameEngine.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new ErrorHandling());
        }
    }
}