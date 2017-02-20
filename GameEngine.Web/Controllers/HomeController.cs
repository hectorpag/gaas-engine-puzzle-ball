using System.Web.Mvc;
using GameEngine.Service.Fuel;
using GameEngine.Service.Game;
using GameEngine.ViewModel;
using Extensions;

namespace GameEngine.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGameService _gameService;


        public HomeController(IGameService gameService)
        {
            _gameService = gameService;

        }
        // GET: Home
        public ActionResult Index(string campaignKey, string panelId, string consumerId)
        {
            var gaasInfoViewModel = new GaasInfoViewModel
            {
                CampaignKey = campaignKey,
                PanelId = panelId.GetInteger(),
                ConsumerId = consumerId
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);

            if (gameViewModel.Config.ShowMenu)
            {
                return View(gameViewModel);
            }
            if (gameViewModel.Config.ShowResult)
            {
                return RedirectToAction("Result","Game", new { campaignKey = gaasInfoViewModel.CampaignKey, panelId = gaasInfoViewModel.PanelId, consumerId = gaasInfoViewModel.ConsumerId });
            }
            return RedirectToRoute("game", new { campaignKey = gaasInfoViewModel.CampaignKey, panelId = gaasInfoViewModel.PanelId, consumerId = gaasInfoViewModel.ConsumerId });
        }
    }
}
