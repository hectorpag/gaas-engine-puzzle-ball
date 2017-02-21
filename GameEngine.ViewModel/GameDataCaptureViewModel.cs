#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class GameDataCaptureViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public string ConsumerId { get; set; } // Consumer_ID
        public long? Start { get; set; } // Start
        public string Finished { get; set; } // Finished
        public DateTime CreatedOn { get; set; } // CreatedOn
    }
}