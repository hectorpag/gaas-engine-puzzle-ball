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

        public List<PortalLeaderboardGradeListViewModel> GetLeaderboardScore(string campaignKey, int storyPanelId, int accumulate, int sortOrder, DateTime? lastResetDate)
        {
            var key = "score";
            var config = _configRepository.Get(campaignKey, storyPanelId);
            if (config == null) return new List<PortalLeaderboardGradeListViewModel>();

            var scoreList = _scoreRepository.Get();
            var winners = new List<PortalLeaderboardGradeListViewModel>();
            switch (sortOrder)
            {
                case 1:
                    if (lastResetDate == null)
                        winners = scoreList.GroupBy(gr => gr.ConsumerId)
                                                .Select(gr => (accumulate == 1) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Sum(grv => grv.Result)) }) :
                                                              (accumulate == 2) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Max(grv => grv.Result)) }) :
                                                              new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Min(grv => grv.Result)) }))
                                                .OrderByDescending(d => d.GameResults, new PortalLeaderboardSortExtensionViewModel(key)).Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD).ToList();
                    else
                        winners = scoreList.Where(gr => gr.Scored > lastResetDate)
                                            .GroupBy(gr => gr.ConsumerId)
                                            .Select(gr => (accumulate == 1) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Sum(grv => grv.Result)) }) :
                                                          (accumulate == 2) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Max(grv => grv.Result)) }) :
                                                          new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Min(grv => grv.Result)) }))
                                            .OrderByDescending(d => d.GameResults, new PortalLeaderboardSortExtensionViewModel(key)).Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD).ToList();
                    break;
                case 2:
                    if (lastResetDate == null)
                        winners = scoreList.GroupBy(gr => gr.ConsumerId)
                                           .Select(gr => (accumulate == 1) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Sum(grv => grv.Result)) }) :
                                                         (accumulate == 2) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Max(grv => grv.Result)) }) :
                                                         new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Min(grv => grv.Result)) }))
                                           .OrderBy(d => d.GameResults, new PortalLeaderboardSortExtensionViewModel(key)).Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD).ToList();
                    else
                        winners = scoreList.Where(gr => gr.Scored > lastResetDate)
                                            .GroupBy(gr => gr.ConsumerId)
                                            .Select(gr => (accumulate == 1) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Sum(grv => grv.Result)) }) :
                                                          (accumulate == 2) ? new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Max(grv => grv.Result)) }) :
                                                          new PortalLeaderboardGradeListViewModel(gr.Key.Value.ToString(), "", new List<PortalLeaderboardGradeViewModel>() { new PortalLeaderboardGradeViewModel(storyPanelId, key, gr.Min(grv => grv.Result)) }))
                                            .OrderBy(d => d.GameResults, new PortalLeaderboardSortExtensionViewModel(key)).Take(NUM_OF_WINNERS_TO_DISPLAY_ON_LEADERBOARD).ToList();
                    break;
            }
            var consumers = _consumerRepository.Get(winners.Select(f => int.Parse(f.ConsumerId)).Distinct().ToList());
            foreach (var res in winners)
            {
                var consumer = consumers.FirstOrDefault(c => c.Id == int.Parse(res.ConsumerId));
                res.ConsumerId = consumer.GaasConsumerId;
            }
            return winners;
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
