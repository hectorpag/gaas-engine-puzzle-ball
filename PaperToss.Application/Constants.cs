using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DodgeBall.Service
{
    public class Constants
    {
        public static int CacheConsumerForDay => 1440;
        public static string GaasBaseUrl
        {
            get
            {
#if DEBUG
                return "http://localhost/gaas";
#endif
                return ConfigurationManager.AppSettings["GaasBaseUrl"];
            }
        }

        public static string HostUrl
        {
            get
            {
#if DEBUG
                return "http://localhost";
#endif
                return ConfigurationManager.AppSettings["HostUrl"];
            }
        }
    }
}
