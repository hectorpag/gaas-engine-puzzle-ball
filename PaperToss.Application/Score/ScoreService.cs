using System.Collections.Generic;
using AutoMapper;
using DodgeBall.Service.GamePlay;
using DodgeBall.ViewModel;

namespace DodgeBall.Service.Score
{
    public  class ScoreService : IScoreService
    {
        private readonly IScoreRepository _scoreRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();

        public ScoreService(IScoreRepository scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }

        #region Implementation of IScoreService

        public ScoreViewModel Get(int id)
        {
            var score = _scoreRepository.Get(id);
            var viewModel = _mapper.Map<ScoreViewModel>(score);
            return viewModel;
        }

        public List<ScoreViewModel> GetByConsumerId(int consumerId)
        {
            var scoreList = _scoreRepository.Get(consumerId);
            var viewModel = _mapper.Map<List<ScoreViewModel>>(scoreList);
            return viewModel;
        }

        public ScoreViewModel Add(ScoreViewModel scoreViewModel)
        {
            var score = _mapper.Map<Model.Score>(scoreViewModel);
            _scoreRepository.Add(score);
            var viewModel = _mapper.Map<ScoreViewModel>(score);
            return viewModel;
        }

        #endregion
    }
    public interface IScoreService
    {
        ScoreViewModel Get(int id);
        List<ScoreViewModel> GetByConsumerId(int consumerId);
        ScoreViewModel Add( ScoreViewModel scoreViewModel);
    }
}
