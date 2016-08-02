using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperToss.ViewModel
{
    public class ScoreViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int? ConsumerId { get; set; } // Consumer_ID
        public System.DateTime Scored { get; set; } // Scored
        public int Result { get; set; } // Result
    }
}
