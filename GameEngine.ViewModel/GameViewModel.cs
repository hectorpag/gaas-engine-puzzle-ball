﻿using System.Collections.Generic;
using Newtonsoft.Json;

namespace GameEngine.ViewModel
{
    public class GameViewModel
    {
        public string HostUrl { get; set; }
        public string GaasBaseUrl { get; set; }
        public int TotalLevels { get; set; }
        public ConfigViewModel Config { get; set; }
        public ConsumerViewModel Consumer { get; set; }
        public GameDashboardReturnViewModel Dashboard { get; set; }

        public Dictionary<string, string> Fields => Config.Fields;
    }
}