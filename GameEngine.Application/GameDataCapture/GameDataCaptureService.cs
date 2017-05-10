using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GaasPlay.API.Client.Api;
using GameEngine.ViewModel;

namespace GameEngine.Service.GameDataCapture
{
    public class GameDataCaptureService : IGameDataCaptureService
    {
        private readonly IGameDataCaptureRepository _gameDataCaptureRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
        private readonly ICampaignQuestionApi _gaasPlayDataCaptureApi;

        public GameDataCaptureService(
            IGameDataCaptureRepository gameDataCaptureRepository,
            ICampaignQuestionApi gaasPlayDataCaptureApi)
        {
            _gameDataCaptureRepository = gameDataCaptureRepository;
            _gaasPlayDataCaptureApi = gaasPlayDataCaptureApi;
        }

        public int Add(GameDataCaptureViewModel gameDataCaptureViewModel)
        {
            var gameDataCapture = _mapper.Map<Model.GameDataCapture>(gameDataCaptureViewModel);
            _gameDataCaptureRepository.Add(gameDataCapture);
           return 1;
        }

        public GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel)
        {
            //Test mock here
            //return new GameDataCaptureNextQuestionViewModel()
            //{
            //    QuestionId = 1234,
            //    Question = "Can you haz cheesburger?",
            //    Responses = new Dictionary<string, string>()
            //    {
            //        {"1","Salmon"}, {"2", "Groot"}, {"3", "Mirklewinks"}, {"4", "Atom bombs"}
            //    }
            //};

            var rs = _gaasPlayDataCaptureApi.GetNextCampaignQuestion(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);
            if (rs == null) throw new Exception("No result returned from data capture.");

            return new GameDataCaptureNextQuestionViewModel()
            {
                QuestionId = rs.Data.CampaignQuestionId,
                Question = rs.Data.CampaignQuestionDescription,
                Responses = rs.Data.CampaignQuestionResponses.ToDictionary(r => r.ResponseId.ToString(), r => r.Response)
            };
        }

        public void AnswerQuestion(GaasInfoViewModel gaasInfoViewModel, AnswerQuestionViewModel answerVm)
        {
            var rs = _gaasPlayDataCaptureApi.SubmitAnswer(
                gaasInfoViewModel.CampaignKey,
                gaasInfoViewModel.ConsumerId,
                answerVm.QuestionId,
                answerVm.ResponseId);
        }
    }

    public interface IGameDataCaptureService
    {
        int Add(GameDataCaptureViewModel gameDataCaptureViewModel);
        GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel);
        void AnswerQuestion(GaasInfoViewModel gaasInfoViewModel, AnswerQuestionViewModel answerVm);
    }
}
