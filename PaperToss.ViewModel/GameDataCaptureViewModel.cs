using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DodgeBall.ViewModel
{
  public class GameDataCaptureViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int ConsumerId { get; set; } // Consumer_ID
        public long? Start { get; set; } // Start
        public string Finished { get; set; } // Finished
        public System.DateTime CreatedOn { get; set; } // CreatedOn
    }
}
