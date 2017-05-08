#region

using System;
using System.Collections.Generic;

#endregion

namespace GameEngine.ViewModel
{
    public class GameDataCaptureNextQuestionViewModel
    {
        public string Question { get; set; }
        public List<string> Responses { get; set; }
    }
}