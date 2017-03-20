using System.Configuration;

namespace GameEngine.Service.Configuration
{
    public class ActivitiesConfig
    {
        public static void StartActivitiesHelper()
        {
            //posting activities (this line will be needed in all game engines)
            GaasPlay.Activities.ActivitiesClientHelper.Initialize(
                ConfigurationManager.AppSettings["GaasPlay.Activities.Topic"],
                ConfigurationManager.AppSettings["ServiceBus.ConnectionString"]);
        }

    }
}
