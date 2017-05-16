using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Serilog;

namespace GameEngine.Service
{
    public class Logging
    {
        public static void Error(Exception ex, string messageTemplate = null)
        {
            System.Diagnostics.Trace.TraceError(ex.Message, ex.StackTrace);
            Serilog.Log.Error(ex, messageTemplate ?? ex.Message);
        }

        public static void Info(string messageTemplate, object propertyValue = null)
        {
//#if DEBUG
            if (propertyValue == null)
            {
                System.Diagnostics.Trace.TraceInformation(messageTemplate);
                Serilog.Log.Information(messageTemplate);
            }
            else
            {
                try
                {
                    System.Diagnostics.Trace.TraceInformation(messageTemplate + " " + JsonConvert.SerializeObject(propertyValue));
                    Serilog.Log.Information(messageTemplate + "{obj}", JsonConvert.SerializeObject(propertyValue));
                }
                catch (Exception e)
                {
                    var whatevs = e;
                    System.Diagnostics.Trace.TraceInformation(messageTemplate + " - cannot serialise object data");
                    Serilog.Log.Information(messageTemplate + " - cannot serialise object data");
                }
            }
//#endif
        }
    }
}