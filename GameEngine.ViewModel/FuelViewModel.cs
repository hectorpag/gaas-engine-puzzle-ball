#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class FuelViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int ConsumerId { get; set; } // Consumer_ID
        public DateTime Created { get; set; } // Created
        public DateTime? UtilizedDate { get; set; } // UtilizedDate
        public bool AutoDiscard { get; set; } // AutoDiscard
    }
}