using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperToss.ViewModel
{
 public   class GamePlayViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int FuelId { get; set; } // Fuel_ID
        public int ConsumerId { get; set; } // Consumer_ID
        public int Gaas_PanelId { get; set; }
        public int LevelPlayed { get; set; } // LevelPlayed
        public System.DateTime PlayedDate { get; set; } // PlayedDate
        public decimal Score { get; set; } // Score
        public int ScoreTime { get; set; } // ScoreTime
    }
}
