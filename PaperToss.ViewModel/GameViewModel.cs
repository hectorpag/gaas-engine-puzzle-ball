namespace PaperToss.ViewModel
{
    public class GameViewModel
    {
        public string HostUrl { get; set; }
        public string GaasBaseUrl { get; set; }
        public ConfigViewModel Config { get; set; }
        public ConsumerViewModel Consumer { get; set; }
    }
}