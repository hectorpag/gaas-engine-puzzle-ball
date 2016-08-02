using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperToss.ViewModel
{
  public  class ConfigViewModel
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
        public string CustomText { get; set; } // CustomText 
        public string FbShareName { get; set; } // FBShare_Name (length: 500)
        public string FbShareCaption { get; set; } // FBShare_Caption (length: 500)
        public string FbShareUrl { get; set; } // FBShare_Url (length: 500)
        public string FbShareScore1ImgUrl { get; set; } // FBShare_Score1_ImgUrl (length: 500)
        public string FbShareScore2ImgUrl { get; set; } // FBShare_Score2_ImgUrl (length: 500)
        public string FbShareScore3ImgUrl { get; set; } // FBShare_Score3_ImgUrl (length: 500)
        public string FbShareScore4ImgUrl { get; set; } // FBShare_Score4_ImgUrl (length: 500)
    }
}
