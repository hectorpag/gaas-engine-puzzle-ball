namespace GameEngine.ViewModel
{
    public class ConsumerViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public string GaasCampaignKey { get; set; } // Gaas_CampaignKey (length: 128)
        public string GaasConsumerId { get; set; } // Gaas_ConsumerId
        public string GaasConsumerName { get; set; } // Gaas_ConsumerName (length: 500)
        public string GaasGender { get; set; } // Gaas_Gender (length: 50)
    }
}