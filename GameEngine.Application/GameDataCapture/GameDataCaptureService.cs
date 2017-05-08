using System.Collections.Generic;
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
        //private readonly IGaasDataCaptureApi _gaasDcApi;

        public GameDataCaptureService(
            IGameDataCaptureRepository gameDataCaptureRepository
            //IGaasDataCaptureApi gaasDcApi
            )
        {
            _gameDataCaptureRepository = gameDataCaptureRepository;
            //_gaasDcApi = gaasDcApi;
        }

        public int Add(GameDataCaptureViewModel gameDataCaptureViewModel)
        {
            var gameDataCapture = _mapper.Map<Model.GameDataCapture>(gameDataCaptureViewModel);
            _gameDataCaptureRepository.Add(gameDataCapture);
           return 1;
        }

        public GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel)
        {
            return new GameDataCaptureNextQuestionViewModel();
            //var cacheModel = _cacheManager.Get(GetKey(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId), () =>
            //{
            //    var consumer = _consumerRepository.GetByGaasInfo(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);
            //    var viewModel = _mapper.Map<ConsumerViewModel>(consumer);
            //    return viewModel;
            //});

            //return cacheModel;

            //_gaasDcApi.GetNext();
        }
    }

    public interface IGameDataCaptureService
    {
        int Add(GameDataCaptureViewModel gameDataCaptureViewModel);
        GameDataCaptureNextQuestionViewModel GetNextQuestion(GaasInfoViewModel gaasInfoViewModel);
    }
}
