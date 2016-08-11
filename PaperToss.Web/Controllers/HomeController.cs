using System.Web.Mvc;
using PaperToss.Service.Fuel;
using PaperToss.Service.Game;
using PaperToss.ViewModel;
using Extensions;

namespace PaperToss.Web.Controllers
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
                ConsumerId = consumerId.GetInteger()
            };

            var gameViewModel = _gameService.Load(gaasInfoViewModel);

            if (gameViewModel.Config.ShowMenu)
            {
                return View(gameViewModel);
            }
            else
            {
                return RedirectToRoute("game", new { campaignKey = gaasInfoViewModel.CampaignKey, panelId = gaasInfoViewModel.PanelId, consumerId = gaasInfoViewModel.ConsumerId });
            }
        }
    }
}
