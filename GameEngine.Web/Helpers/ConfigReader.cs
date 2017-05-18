using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameEngine.Web.Helpers
{
    public class ConfigReader
    {
        public static string GetItem(Dictionary<string, string> fields, string key, string defaultIfNotFound = "")
        {
            if (fields == null)
                return defaultIfNotFound;

            return !fields.ContainsKey(key)
                ? defaultIfNotFound
                : fields.FirstOrDefault(f => f.Key.Equals(key, StringComparison.CurrentCultureIgnoreCase)).Value;
        }
    }
}