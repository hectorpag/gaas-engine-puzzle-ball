using System;
using System.Collections.Generic;
using AutoMapper;
using GameEngine.ViewModel;
using System.Linq;
using GaasPlayCore.ViewModel;
using GameEngine.Service.Consumer;
using GameEngine.Service.Config;
namespace GameEngine.Service.Score
{
    public class ScoreService : IScoreService
    {
        private readonly IScoreRepository _scoreRepository;
        private readonly IConsumerRepository _consumerRepository;
        private readonly IConfigRepository _configRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
        private const int NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD = 20;
        public ScoreService(IScoreRepository scoreRepository, IConfigRepository configRepository, IConsumerRepository consumerRepository)
        {
            _scoreRepository = scoreRepository;
            _configRepository = configRepository;
            _consumerRepository = consumerRepository;
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

        public List<PortalLeaderboardGradeListViewModel> GetLeaderboardScore(
            string campaignKey, int storyPanelId, int accumulate, int sortOrder, DateTime? lastResetDate)
        {
            var key = "score";
            var config = _configRepository.Get(campaignKey, storyPanelId);
            if (config == null) return new List<PortalLeaderboardGradeListViewModel>();

            var winnersList = (lastResetDate == null
                ? _scoreRepository.GetWinners()
                : _scoreRepository.GetWinners(w => w.Scored > lastResetDate));

            IOrderedEnumerable<IGrouping<int?, Model.Score>> ordered = null;

            switch (accumulate)
            {
                case 1:
                    switch (sortOrder)
                    {
                        case 1:
                            ordered = winnersList.OrderByDescending(w => w.Sum(m => m.Result));
                            break;
                        case 2:
                            ordered = winnersList.OrderBy(w => w.Sum(m => m.Result));
                            break;
                        default:
                            ordered = null;
                            break;
                    }
                    break;

                case 2:
                    switch (sortOrder)
                    {
                        case 1:
                            ordered = winnersList.OrderByDescending(w => w.Max(m => m.Result));
                            break;
                        case 2:
                            ordered = winnersList.OrderBy(w => w.Max(m => m.Result));
                            break;
                        default:
                            ordered = null;
                            break;
                    }
                    break;

                default:
                    switch (sortOrder)
                    {
                        case 1:
                            ordered = winnersList.OrderByDescending(w => w.Min(m => m.Result));
                            break;
                        case 2:
                            ordered = winnersList.OrderBy(w => w.Min(m => m.Result));
                            break;
                        default:
                            ordered = null;
                            break;
                    }
                    break;
            }

            var take = ordered?.Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD) ?? winnersList.Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD);

            var rs = take
                .Select(gr =>
                        new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", "",
                            new List<PortalLeaderboardGradeViewModel>()
                            {
                                new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Sum(grv => grv.Result))
                            }))
                .ToList();

            var consumers = _consumerRepository.Get(rs.Select(f => int.Parse(f.ConsumerId)).Distinct().ToList());
            foreach (var res in rs)
            {
                var consumer = consumers.FirstOrDefault(c => c.Id == int.Parse(res.ConsumerId));
                if (consumer != null) res.ConsumerId = consumer.GaasConsumerId;
            }

            return rs;
        }
        #endregion
    }

    public interface IScoreService
    {
        ScoreViewModel Get(int id);
        List<ScoreViewModel> GetByConsumerId(int consumerId);
        ScoreViewModel Add(ScoreViewModel scoreViewModel);
        List<PortalLeaderboardGradeListViewModel> GetLeaderboardScore(string campaignKey, int storyPanelId, int accumulate, int sortOrder, DateTime? lastResetDate);
    }
}
