#region

using System;

#endregion

namespace GameEngine.ViewModel
{
    public class AnswerQuestionViewModel
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public string AnswerValue { get; set; }
        public DateTime? EventDate { get; set; }
    }
}