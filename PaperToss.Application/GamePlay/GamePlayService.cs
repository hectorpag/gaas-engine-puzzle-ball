using System;
using System.Collections.Generic;
using AutoMapper;
using PaperToss.ViewModel;

namespace PaperToss.Service.GamePlay
{
    public class GamePlayService : IGamePlayService
    {
        private readonly IGamePlayRepository _gamePlayRepository;
        private readonly IUniqueGamePlayViewRepository _uniqueGamePlayViewRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
        public GamePlayService(IGamePlayRepository gamePlayRepository, IUniqueGamePlayViewRepository uniqueGamePlayViewRepository)
        {
            _gamePlayRepository = gamePlayRepository;
            _uniqueGamePlayViewRepository = uniqueGamePlayViewRepository;
        }

        #region Implementation of IGamePlayService

        public GamePlayViewModel Get(int id)
        {
            var gamePlay = _gamePlayRepository.Get(id);
            var viewModel = _mapper.Map<GamePlayViewModel>(gamePlay);
            return viewModel;
        }

        public List<GamePlayViewModel> GetByConsumerId(int consumerId)
        {
            var gamePlayList = _gamePlayRepository.Get(consumerId);
            var viewModel = _mapper.Map<List<GamePlayViewModel>>(gamePlayList);
            return viewModel;
        }

        public GamePlayViewModel Add(GamePlayViewModel gamePlayViewModel)
        {
            var gamePlay = _mapper.Map<Model.GamePlay>(gamePlayViewModel);
            _gamePlayRepository.Add(gamePlay);
            var viewModel = _mapper.Map<GamePlayViewModel>(gamePlay);
            return viewModel;
        }

        public List<UniqueGamePlayViewViewModel> GetUniqueByConsumerId(int consumerId)
        {
            var uniqueGamePlayViewList = _uniqueGamePlayViewRepository.GetByConsumerId(consumerId);
            var viewModel = _mapper.Map<List<UniqueGamePlayViewViewModel>>(uniqueGamePlayViewList);
            return viewModel;
        }

        public List<UniqueGamePlayViewViewModel> GetUniqueByFuelId(int consumerId, int fuelId)
        {
            var uniqueGamePlayViewList = _uniqueGamePlayViewRepository.GetByFuelId(consumerId,fuelId);
            var viewModel = _mapper.Map<List<UniqueGamePlayViewViewModel>>(uniqueGamePlayViewList);
            return viewModel;
        }

        public GameDashboardReturnViewModel LoadScoresForDashboard(string campaignKey, int consumerId)
        {
            var scoresforDashboard = _gamePlayRepository.LoadScoresForDashboard(campaignKey, consumerId);
            var viewModel = _mapper.Map<GameDashboardReturnViewModel>(scoresforDashboard);
            return viewModel;
        }

        #endregion
    }

    public interface IGamePlayService
    {
        GamePlayViewModel Get(int id);
        List<GamePlayViewModel> GetByConsumerId(int consumerId);
        GamePlayViewModel Add(GamePlayViewModel gamePlayViewModel);
        List<UniqueGamePlayViewViewModel> GetUniqueByConsumerId(int consumerId);
        List<UniqueGamePlayViewViewModel> GetUniqueByFuelId(int consumerId, int fuelId);
        GameDashboardReturnViewModel LoadScoresForDashboard(string campaignKey, int consumerId);
    }
}
