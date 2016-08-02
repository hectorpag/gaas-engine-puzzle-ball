using System;
using System.Collections.Generic;
using DodgeBall.Model.GaasModels;

namespace DodgeBall.Model.Gaas.Models
{
    public class Consumer
    {
        public Error Error { get; set; }

        public int id { get; set; }
        public string title { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public string fullname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public int? age { get; set; }
        public DateTime? dob { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string post_code { get; set; }
        public Dictionary<string, string> data { get; set; }
    }
}