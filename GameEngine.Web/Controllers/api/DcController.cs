using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using GameEngine.Service.Game;
using GameEngine.Service.GameDataCapture;
using GameEngine.ViewModel;
using Newtonsoft.Json;
using GameEngine.Web.Helpers;

namespace GameEngine.Web.Controllers.api
{
    public class DcController : ApiController
    {
        private readonly IGameDataCaptureService _gameDataCaptureService;

        public DcController(
            IGameDataCaptureService gameDataCaptureService)
        {
            _gameDataCaptureService = gameDataCaptureService;
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task<GameDataCaptureNextQuestionViewModel> GetNextQuestion(Object formData)
        {
            Logging.Info("api/dc/GetNextQuestion", formData);

            return await Task.FromResult(_gameDataCaptureService.GetNextQuestion(
                JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString()))
            );
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public async Task AnswerQuestion(Object formData)
        {
            Logging.Info("api/dc/AnswerQuestion", formData);

            var gaasInfo = JsonConvert.DeserializeObject<GaasInfoViewModel>(formData.ToString());
            var answerVm = JsonConvert.DeserializeObject<AnswerQuestionViewModel>(formData.ToString());
            answerVm.EventDate = DateTime.UtcNow;
            
            // TODO save to DB, post to gaas

            //await Task.Run(() => _gameDataCaptureService.AnswerQuestion(gaasInfo, answerVm));
        }
    }
}