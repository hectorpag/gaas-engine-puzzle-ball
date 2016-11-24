// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.61
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

namespace GameEngine.Model
{

    // GameDataCapture
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class GameDataCapture
    {
        public int Id { get; set; } // ID (Primary key)
        public int ConsumerId { get; set; } // Consumer_ID
        public long? Start { get; set; } // Start
        public string Finished { get; set; } // Finished
        public System.DateTime CreatedOn { get; set; } // CreatedOn

        public GameDataCapture()
        {
            CreatedOn = System.DateTime.UtcNow;
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>