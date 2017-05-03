#region

using System;
using System.Web.Mvc;
using GameEngine.Service.Config;
using GameEngine.Service.Game;
using GameEngine.ViewModel;

#endregion

namespace GameEngine.Web.Controllers
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
                GameConfigJson = configFormCollection["txtGameConfigJson"]
            };

            return configViewModel;
        }
    }
}