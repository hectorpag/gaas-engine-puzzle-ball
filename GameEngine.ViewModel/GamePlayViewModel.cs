#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class GamePlayViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int FuelId { get; set; } // Fuel_ID
        public string ConsumerId { get; set; } // Consumer_ID
        public int PanelId { get; set; }
        public int LevelPlayed { get; set; } // LevelPlayed
        public DateTime PlayedDate { get; set; } // PlayedDate
        public decimal Score { get; set; } // Score
        public int ScoreTime { get; set; } // ScoreTime
    }
}