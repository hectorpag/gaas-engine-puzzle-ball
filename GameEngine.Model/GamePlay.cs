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

    // GamePlay
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class GamePlay
    {
        public int Id { get; set; } // ID (Primary key)
        public int ConsumerId { get; set; } // Consumer_ID
        public int FuelId { get; set; } // Fuel_ID
        public int LevelPlayed { get; set; } // LevelPlayed
        public System.DateTime PlayedDate { get; set; } // PlayedDate
        public decimal Score { get; set; } // Score
        public int ScoreTime { get; set; } // ScoreTime

        // Foreign keys
        public virtual Consumer Consumer { get; set; } // FK_GamePlay_Consumer
        public virtual Fuel Fuel { get; set; } // FK_GamePlay_Fuel

        public GamePlay()
        {
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>