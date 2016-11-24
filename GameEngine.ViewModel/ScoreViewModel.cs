#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class ScoreViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int? ConsumerId { get; set; } // Consumer_ID
        public DateTime Scored { get; set; } // Scored
        public int Result { get; set; } // Result
    }
}