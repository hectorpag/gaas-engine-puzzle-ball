﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperToss.Service
{
    public class Leaderboard
    {
        public List<string> GetKeys()
        {
            return new List<string>() { "score" };
        }
    }
}
