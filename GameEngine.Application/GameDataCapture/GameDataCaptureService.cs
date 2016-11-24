using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GameEngine.Service.Fuel;
using GameEngine.ViewModel;

namespace GameEngine.Service.GameDataCapture
{
    public class GameDataCaptureService : IGameDataCaptureService
    {
        private readonly IGameDataCaptureRepository _gameDataCaptureRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();

        public GameDataCaptureService(IGameDataCaptureRepository gameDataCaptureRepository)
        {
            _gameDataCaptureRepository = gameDataCaptureRepository;
        }

        #region Implementation of IGameDataCaptureService

        public int Add(GameDataCaptureViewModel gameDataCaptureViewModel)
        {
            var gameDataCapture = _mapper.Map<Model.GameDataCapture>(gameDataCaptureViewModel);
            _gameDataCaptureRepository.Add(gameDataCapture);
           return 1;
        }

        #endregion
    }

    public interface IGameDataCaptureService
    {
        int Add(GameDataCaptureViewModel gameDataCaptureViewModel);
    }
}
