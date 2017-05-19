using System.Collections.Generic;

namespace GameEngine.ViewModel
{
    public class ResultViewModel
    {
        public GameViewModel GameViewModel { get; set; }

        public int Score { get; set; }

        public Dictionary<string, string> Fields => GameViewModel.Fields;
    }
}