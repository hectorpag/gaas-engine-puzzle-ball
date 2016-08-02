using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DodgeBall.ViewModel
{
    public class FuelViewModel
    {
        public int Id { get; set; } // ID (Primary key)
        public int ConsumerId { get; set; } // Consumer_ID
        public System.DateTime Created { get; set; } // Created
        public System.DateTime? UtilizedDate { get; set; } // UtilizedDate
        public bool AutoDiscard { get; set; } // AutoDiscard
    }
}
