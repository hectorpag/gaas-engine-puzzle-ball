﻿using System;
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
        private readonly ICampaignQuestionApi  _gaasDcApi;

        public GameDataCaptureService(
            IGameDataCaptureRepository gameDataCaptureRepository,
            ICampaignQuestionApi gaasDcApi)
        {
            _gameDataCaptureRepository = gameDataCaptureRepository;
            _gaasDcApi = gaasDcApi;
        }

        public int Add(GameDataCaptureViewModel gameDataCaptureViewModel)
        {
            var gameDataCapture = _mapper.Map<Model.GameDataCapture>(gameDataCaptureViewModel);
            _gameDataCaptureRepository.Add(gameDataCapture);
           return 1;
        }

        public GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel)
        {
            return new GameDataCaptureNextQuestionViewModel()
            {
                QuestionId = 1234,
                Question = "Can you haz cheesburger?",
                Responses = new List<string>() { "Salmon", "Groot", "Mirklewinks", "Atom bombs" }
            };
            //var rs = _gaasDcApi.GetNextCampaignQuestion(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);
            //if (rs == null) throw new Exception("No result returned from data capture.");

            //rs.Data.CampaignQuestionId
            //return new GameDataCaptureNextQuestionViewModel()
            //{
            //    QuestionId = rs.Data.CampaignQuestionId,
            //    Question = rs.Data.CampaignQuestionDescription,
            //    Responses = rs.Data.CampaignQuestionResponses.Select(r => r.Response).ToList()
            //};
        }

        public void AnswerQuestion(GaasInfoViewModel gaasInfoViewModel, AnswerQuestionViewModel answerVm)
        {
            var rs = _gaasDcApi.SubmitAnswer(
                gaasInfoViewModel.CampaignKey, 
                gaasInfoViewModel.ConsumerId,
                answerVm.QuestionId, "huh?");
        }
    }

    public interface IGameDataCaptureService
    {
        int Add(GameDataCaptureViewModel gameDataCaptureViewModel);
        GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel);
        void AnswerQuestion(GaasInfoViewModel gaasInfoViewModel, AnswerQuestionViewModel answerVm);
    }
}
