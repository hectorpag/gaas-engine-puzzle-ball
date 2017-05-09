#region

using System;
using System.Collections.Generic;

#endregion

namespace GameEngine.ViewModel
{
    public class GameDataCaptureNextQuestionViewModel
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public Dictionary<string, string> Responses { get; set; }
    }
}