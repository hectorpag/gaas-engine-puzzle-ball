using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameEngine.Web.Helpers
{
    public class ConfigReader
    {
        public static string GetItem(ViewModel.GameViewModel model, string key, string defaultIfNotFound = "")
        {
            return !model.Fields.ContainsKey(key)
                ? defaultIfNotFound
                : model.Fields.FirstOrDefault(f => f.Key.Equals(key, StringComparison.CurrentCultureIgnoreCase)).Value;
        }
    }
}