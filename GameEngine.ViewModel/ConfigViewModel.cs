using System.Collections.Generic;
using GameEngine.Model.GameEngine;
using Newtonsoft.Json;

namespace GameEngine.ViewModel
{
    public class ConfigViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public string GaasCampaignKey { get; set; } // Gaas_CampaignKey (length: 128)
        public int GaasPanelId { get; set; } // Gaas_PanelId
        public bool ShowMenu { get; set; } // ShowMenu
        public bool ShowResult { get; set; } // ShowResult
        public int? LevelNumber { get; set; } // LevelNumber
        public string GameConfigJson { get; set; } // GameConfigJson

        public List<FieldDefinition> Fields => 
            string.IsNullOrWhiteSpace(GameConfigJson)
                ? new List<FieldDefinition>()
                : JsonConvert.DeserializeObject<List<FieldDefinition>>(GameConfigJson);
    }
}