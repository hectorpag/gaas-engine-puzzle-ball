using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameEngine.Model.GameEngine
{
    public class FieldDefinition
    {
        public enum Types
        {
            Text = 0,
            Number = 1
        }

        public string Name { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public string Value { get; set; }

        public Types TypeValue => (Types)Enum.Parse(typeof(Types), Type);
    }
}
