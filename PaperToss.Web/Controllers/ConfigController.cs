#region

using System;
using System.Web.Mvc;
using PaperToss.Service.Config;
using PaperToss.Service.Game;
using PaperToss.ViewModel;

#endregion

namespace PaperTossWeb.Controllers
{
    public class ConfigController : Controller
    {
        private readonly IConfigService _configService;
        private readonly IGameService _gameService;

        public ConfigController(IConfigService configService, IGameService gameService)
        {
            _configService = configService;
            _gameService = gameService;
        }

        // GET: Config
        public ActionResult Index(string campaignKey, int panelId)
        {
            var config = _configService.Get(campaignKey, panelId);
            return View(config);
        }

        // POST: ConfigViewModels/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(string campaignKey, int panelId, FormCollection configFormCollection)
        {
            var configViewModel = GetConfigViewModel(campaignKey, panelId, configFormCollection);
            if (ModelState.IsValid)
            {
                configViewModel = _configService.Update(campaignKey, panelId, configViewModel);
            }
            return View("Index", configViewModel);
        }


        public ActionResult ClearCache(string campaignKey, int panelId, FormCollection configFormCollection)
        {
          _gameService.ClearAllCache();
            return RedirectToAction("Index");
        }


        [NonAction]
        private static ConfigViewModel GetConfigViewModel(string campaignKey, int panelId, FormCollection configFormCollection)
        {
            var configViewModel = new ConfigViewModel
            {
                Id = string.IsNullOrEmpty(configFormCollection["Id"]) ? 0 : Convert.ToInt32(configFormCollection["Id"]),
                GaasCampaignKey = campaignKey,
                GaasPanelId = panelId,
                ShowMenu = (configFormCollection["chkShowHome"] ?? "").Equals("on", StringComparison.CurrentCultureIgnoreCase),
                ShowResult = (configFormCollection["chkShowResult"] ?? "").Equals("on", StringComparison.CurrentCultureIgnoreCase),
                LevelNumber = string.IsNullOrEmpty(configFormCollection["txtLevelNumber"]) ? 0 : Convert.ToInt32(configFormCollection["txtLevelNumber"]),
                CutOffScore = string.IsNullOrEmpty(configFormCollection["txtCutoffScore"]) ? 0 : Convert.ToInt32(configFormCollection["txtCutoffScore"]),
                FbShareScore1Low = string.IsNullOrEmpty(configFormCollection["txtFBShareScore1Low"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore1Low"]),
                FbShareScore1High =
                    string.IsNullOrEmpty(configFormCollection["txtFBShareScore1High"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore1High"]),
                FbShareScore1Msg = (configFormCollection["txtFBShareScore1Msg"] ?? string.Empty).Trim(),
                FbShareScore2Low = string.IsNullOrEmpty(configFormCollection["txtFBShareScore2Low"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore2Low"]),
                FbShareScore2High =
                    string.IsNullOrEmpty(configFormCollection["txtFBShareScore2High"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore2High"]),
                FbShareScore2Msg = (configFormCollection["txtFBShareScore2Msg"] ?? string.Empty).Trim(),
                FbShareScore3Low = string.IsNullOrEmpty(configFormCollection["txtFBShareScore3Low"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore3Low"]),
                FbShareScore3High =
                    string.IsNullOrEmpty(configFormCollection["txtFBShareScore3High"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore3High"]),
                FbShareScore3Msg = (configFormCollection["txtFBShareScore3Msg"] ?? string.Empty).Trim(),
                FbShareScore4Low = string.IsNullOrEmpty(configFormCollection["txtFBShareScore4Low"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore4Low"]),
                FbShareScore4High =
                    string.IsNullOrEmpty(configFormCollection["txtFBShareScore4High"]) ? null : (int?) Convert.ToInt32(configFormCollection["txtFBShareScore4High"]),
                FbShareScore4Msg = (configFormCollection["txtFBShareScore4Msg"] ?? string.Empty).Trim(),
                CustomText = (configFormCollection["txtCustomText"] ?? string.Empty).Trim(),
                FbShareName = (configFormCollection["txtFBShareName"] ?? string.Empty).Trim(),
                FbShareCaption = (configFormCollection["txtFBShareCaption"] ?? string.Empty).Trim(),
                FbShareUrl = (configFormCollection["txtFbShareUrl"] ?? string.Empty).Trim(),
                FbShareScore1ImgUrl = (configFormCollection["txtFbShareScore1ImgUrl"] ?? string.Empty).Trim(),
                FbShareScore2ImgUrl = (configFormCollection["txtFbShareScore2ImgUrl"] ?? string.Empty).Trim(),
                FbShareScore3ImgUrl = (configFormCollection["txtFbShareScore3ImgUrl"] ?? string.Empty).Trim(),
                FbShareScore4ImgUrl = (configFormCollection["txtFbShareScore4ImgUrl"] ?? string.Empty).Trim()
            };

            return configViewModel;
        }
    }
}