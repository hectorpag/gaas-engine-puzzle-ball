using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameEngine.Web.Helpers
{
    public class ErrorLogging
    {
        public static void Log(Exception ex, string messageTemplate = null)
        {
            //var telem = new TelemetryClient(); telem.TrackException(ex); telem.Flush();
            Serilog.Log.Error(ex, messageTemplate ?? ex.Message);
        }
    }
}