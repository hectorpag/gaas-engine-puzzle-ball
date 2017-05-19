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

        public enum AccumulationTypes
        {
            Min = 0,
            Sum = 1,
            Max = 2
        }

        public enum SortOrders
        {
            None = 0,
            Descending = 1,
            Ascending = 2
        }

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
            string campaignKey, int storyPanelId, AccumulationTypes accumulate, SortOrders sortOrder, DateTime? lastResetDate)
        {
            /*********
             * TODO: if game engines support multiple campaigns, we'll need to have campaignKey in the scores table to restrict by the passed in campaign
             **********/

            var config = _configRepository.Get(campaignKey, storyPanelId);
            if (config == null) return new List<PortalLeaderboardGradeListViewModel>();

            var winnersList = (lastResetDate == null
                ? _scoreRepository.GetWinners()
                : _scoreRepository.GetWinners(w => w.Scored > lastResetDate));

            IOrderedEnumerable<IGrouping<int?, Model.Score>> ordered = null;

            switch (accumulate)
            {
                case AccumulationTypes.Sum:
                    switch (sortOrder)
                    {
                        case SortOrders.Descending:
                            ordered = winnersList.OrderByDescending(w => w.Sum(m => m.Result));
                            break;
                        case SortOrders.Ascending:
                            ordered = winnersList.OrderBy(w => w.Sum(m => m.Result));
                            break;
                        default:
                            ordered = null;
                            break;
                    }
                    break;

                case AccumulationTypes.Max:
                    switch (sortOrder)
                    {
                        case SortOrders.Descending:
                            ordered = winnersList.OrderByDescending(w => w.Max(m => m.Result));
                            break;
                        case SortOrders.Ascending:
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
                        case SortOrders.Descending:
                            ordered = winnersList.OrderByDescending(w => w.Min(m => m.Result));
                            break;
                        case SortOrders.Ascending:
                            ordered = winnersList.OrderBy(w => w.Min(m => m.Result));
                            break;
                        default:
                            ordered = null;
                            break;
                    }
                    break;
            }

            var take = (ordered?.Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD) ?? winnersList.Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD))
                .ToList();

            List<PortalLeaderboardGradeListViewModel> rs;

            switch (accumulate)
            {
                case AccumulationTypes.Sum:
                    rs = take.Select(gr =>
                        new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", "",
                            new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, "score", gr.Sum(g => g.Result)) }))
                    .ToList();
                    break;
                case AccumulationTypes.Max:
                    rs = take.Select(gr =>
                        new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", "",
                            new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, "score", gr.Max(g => g.Result)) }))
                    .ToList();
                    break;
                default:
                    rs = take.Select(gr =>
                        new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", "",
                            new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, "score", gr.Min(g => g.Result)) }))
                    .ToList();
                    break;
            }
            
            var consumers = _consumerRepository.Get(rs.Select(f => int.Parse(f.ConsumerId)).Distinct().ToList());
            foreach (var res in rs)
            {
                var consumer = consumers.FirstOrDefault(c => c.Id == int.Parse(res.ConsumerId));
                if (consumer == null) continue;
                res.ConsumerId = consumer.GaasConsumerId;
                res.ConsumerName = consumer.GaasConsumerName;
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
        List<PortalLeaderboardGradeListViewModel> GetLeaderboardScore(
            string campaignKey, int storyPanelId, ScoreService.AccumulationTypes accumulate, ScoreService.SortOrders sortOrder, DateTime? lastResetDate);
    }
}
