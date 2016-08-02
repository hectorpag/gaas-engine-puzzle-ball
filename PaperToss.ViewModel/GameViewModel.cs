using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PaperToss.ViewModel;

namespace PaperToss.ViewModel
{
    public class GameViewModel
    {
        
        public string HostUrl { get; set; }
        public string GaasBaseUrl { get; set; }
        public ConfigViewModel Config { get; set; }
        public ConsumerViewModel Consumer { get; set; }
    }
}
