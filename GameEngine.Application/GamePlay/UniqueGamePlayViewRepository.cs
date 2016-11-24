using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using GameEngine.Data;
using GameEngine.Model;

namespace GameEngine.Service.GamePlay
{
    public class UniqueGamePlayViewRepository : IUniqueGamePlayViewRepository
    {
        private readonly dbContext _context;
        public UniqueGamePlayViewRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
        #region Implementation of IUniqueGamePlayViewRepository

        public List<UniqueGamePlayView> GetByFuelId(int consumerId, int fuelId)
        {
            var uniqueGamePlay = _context.UniqueGamePlayViews
              .AsNoTracking()
              .Where(c => c.ConsumerId == consumerId && c.FuelId == fuelId).ToList();
            return uniqueGamePlay;
        }

        List<UniqueGamePlayView> IUniqueGamePlayViewRepository.GetByConsumerId(int consumerId)
        {
            var uniqueGamePlay = _context.UniqueGamePlayViews
               .AsNoTracking()
               .Where(c => c.ConsumerId == consumerId).ToList();
            return uniqueGamePlay;
        }

        List<UniqueGamePlayView> IUniqueGamePlayViewRepository.GetGamesPlayedByConsumerId(int consumerId)
        {
            //TODO: 
            //          SELECT
            //   [Consumer_ID]
            //    ,[Fuel_ID]
            //    --,[GamePlayID]

            //    --,[PlayedDate]
            //    ,Sum([Score])
            //    ,Sum([ScoreTime])
            // ,Count([LevelPlayed])
            //FROM
            //[gaas - engine - netball].[dbo].[UniqueGamePlayView]
            //      GROUP BY[Fuel_ID],[Consumer_ID]
            //var uniqueGamePlay = _context.UniqueGamePlayViews
            //   .AsNoTracking()
            //   .GroupBy(x=>x.FuelId,x=>x.ConsumerId)
            //   .Where(c => c.ConsumerId == consumerId);
            return new List<UniqueGamePlayView>();
        }

        #endregion
    }

    public interface IUniqueGamePlayViewRepository
    {
        List<Model.UniqueGamePlayView> GetByFuelId(int consumerId, int fuelId);
        List<Model.UniqueGamePlayView> GetByConsumerId(int consumerId);
        List<Model.UniqueGamePlayView> GetGamesPlayedByConsumerId(int consumerId);

    }
}
