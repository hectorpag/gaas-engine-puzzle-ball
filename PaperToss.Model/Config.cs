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

namespace PaperToss.Model
{

    // Config
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class Config
    {
        public int Id { get; set; } // ID (Primary key)
        public string GaasCampaignKey { get; set; } // Gaas_CampaignKey (length: 128)
        public int GaasPanelId { get; set; } // Gaas_PanelId
        public bool ShowMenu { get; set; } // ShowMenu
        public bool ShowResult { get; set; } // ShowResult
        public int? LevelNumber { get; set; } // LevelNumber
        public int? CutOffScore { get; set; } // CutOffScore
        public int? FbShareScore1Low { get; set; } // FBShare_Score1_Low
        public int? FbShareScore1High { get; set; } // FBShare_Score1_High
        public string FbShareScore1Msg { get; set; } // FBShare_Score1_Msg (length: 500)
        public int? FbShareScore2Low { get; set; } // FBShare_Score2_Low
        public int? FbShareScore2High { get; set; } // FBShare_Score2_High
        public string FbShareScore2Msg { get; set; } // FBShare_Score2_Msg (length: 500)
        public int? FbShareScore3Low { get; set; } // FBShare_Score3_Low
        public int? FbShareScore3High { get; set; } // FBShare_Score3_High
        public string FbShareScore3Msg { get; set; } // FBShare_Score3_Msg (length: 500)
        public int? FbShareScore4Low { get; set; } // FBShare_Score4_Low
        public int? FbShareScore4High { get; set; } // FBShare_Score4_High
        public string FbShareScore4Msg { get; set; } // FBShare_Score4_Msg (length: 500)
        public string CustomText { get; set; } // CustomText (length: 100)
        public string FbShareName { get; set; } // FBShare_Name (length: 500)
        public string FbShareCaption { get; set; } // FBShare_Caption (length: 500)
        public string FbShareUrl { get; set; } // FBShare_Url (length: 500)
        public string FbShareScore1ImgUrl { get; set; } // FBShare_Score1_ImgUrl (length: 500)
        public string FbShareScore2ImgUrl { get; set; } // FBShare_Score2_ImgUrl (length: 500)
        public string FbShareScore3ImgUrl { get; set; } // FBShare_Score3_ImgUrl (length: 500)
        public string FbShareScore4ImgUrl { get; set; } // FBShare_Score4_ImgUrl (length: 500)

        public Config()
        {
            ShowMenu = false;
            ShowResult = false;
            InitializePartial();
        }

        partial void InitializePartial();
    }

}
// </auto-generated>
