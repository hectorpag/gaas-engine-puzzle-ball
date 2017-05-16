using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameEngine.Web.Helpers
{
    public class Logging
    {
        public static void Error(Exception ex, string messageTemplate = null)
        {
            //var telem = new TelemetryClient(); telem.TrackException(ex); telem.Flush();
            System.Diagnostics.Trace.TraceError(ex.Message, ex.StackTrace);
            Serilog.Log.Error(ex, messageTemplate ?? ex.Message);
        }

        public static void Info(string messageTemplate, object propertyValue = null)
        {
#if DEBUG
            System.Diagnostics.Trace.TraceInformation(messageTemplate, propertyValue);
            Serilog.Log.Information(messageTemplate, propertyValue);
#endif
        }
    }
}