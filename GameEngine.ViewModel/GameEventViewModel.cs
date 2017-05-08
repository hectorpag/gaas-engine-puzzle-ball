#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class GameEventViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int FuelId { get; set; }
        public string ConsumerId { get; set; }
        public int PanelId { get; set; }
        public DateTime EventDate { get; set; }
        public dynamic EventData { get; set; }
    }
}