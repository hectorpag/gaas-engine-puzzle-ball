using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace GameEngine.Web.Helpers
{
    public class Logging
    {
        public static void Error(Exception ex, string messageTemplate = null)
        {
            //var telem = new TelemetryClient(); telem.TrackException(ex); telem.Flush();
            Service.Logging.Error(ex, messageTemplate);
        }

        public static void Info(string messageTemplate, object propertyValue = null)
        {
            Service.Logging.Info(messageTemplate, propertyValue);
        }
    }
}