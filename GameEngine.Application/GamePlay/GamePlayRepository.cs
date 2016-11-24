using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using Data;
using GameEngine.Data;
using GameEngine.Model;
using GameEngine.ViewModel;

namespace GameEngine.Service.GamePlay
{
    public class GamePlayRepository : IGamePlayRepository
    {
        private readonly dbContext _context;
        public GamePlayRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
        #region Implementation of IConfigRepository

        public Model.GamePlay Get(int id)
        {

            var gamePlay = _context.GamePlays
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == id);
            return gamePlay;

        }

        public List<Model.GamePlay> GetByConsumerId(int consumerId)
        {
            var gamePlay = _context.GamePlays
               .AsNoTracking()
               .Where(c => c.ConsumerId == consumerId).ToList();
            return gamePlay;
        }

        public Model.GamePlay Add(Model.GamePlay gamePlay)
        {
            _context.GamePlays.Add(gamePlay);
            _context.SaveChanges();
            return gamePlay;
        }

        public GameDashboardReturnModel LoadScoresForDashboard(string campaignKey, int consumerId)
        {
            var returnViewModel = new GameDashboardReturnModel();
            SqlParameter campaignKeyParam = new SqlParameter("@campaignKey", campaignKey);
            SqlParameter consumerIdParam = new SqlParameter("@consumerID", consumerId);
            SqlParameter startDateOfWeekParam = new SqlParameter("@StartDate", DBNull.Value);


            var result =
                   _context.Database.SqlQuery<GameDashboardReturnModel>(
                       "dbo.GameDashboard @consumerId,@campaignKey ,@StartDate",
                      consumerIdParam, campaignKeyParam, startDateOfWeekParam).FirstOrDefault();


            if (result != null)
            {
                returnViewModel.BestScore = (int)result.BestScore;
                if (result.LeaderBoardPosition != null) returnViewModel.LeaderBoardPosition = (int)result.LeaderBoardPosition;
            }

            return returnViewModel;
        }

        #endregion
    }

    public interface IGamePlayRepository
    {
        Model.GamePlay Get(int id);
        List<Model.GamePlay> GetByConsumerId(int consumerId);
        Model.GamePlay Add(Model.GamePlay gamePlay);
        GameDashboardReturnModel LoadScoresForDashboard(string campaignKey, int consumerId);
    }
}
