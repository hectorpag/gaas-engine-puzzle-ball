#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class UniqueGamePlayViewViewModel
    {
        public int ConsumerId { get; set; } // Consumer_ID
        public int FuelId { get; set; } // Fuel_ID
        public int GamePlayId { get; set; } // GamePlayID
        public int LevelPlayed { get; set; } // LevelPlayed
        public DateTime PlayedDate { get; set; } // PlayedDate
        public decimal Score { get; set; } // Score
        public int ScoreTime { get; set; } // ScoreTime
    }
}