
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

namespace DodgeBall.Model
{





    // Consumer


    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class Consumer
    {




        public int Id { get; set; } // ID (Primary key)



        public string GaasCampaignKey { get; set; } // Gaas_CampaignKey (length: 128)



        public int GaasConsumerId { get; set; } // Gaas_ConsumerId



        public string GaasConsumerName { get; set; } // Gaas_ConsumerName (length: 500)



        public string GaasGender { get; set; } // Gaas_Gender (length: 50)



        // Reverse navigation


        public virtual System.Collections.Generic.ICollection<GamePlay> GamePlays { get; set; } // GamePlay.FK_GamePlay_Consumer

        public virtual System.Collections.Generic.ICollection<Score> Scores { get; set; } // Scores.FK_Scores_Consumer




        public Consumer()
        {


            GamePlays = new System.Collections.Generic.List<GamePlay>();

            Scores = new System.Collections.Generic.List<Score>();

            InitializePartial();
        }


        partial void InitializePartial();

    }



}
// </auto-generated>
