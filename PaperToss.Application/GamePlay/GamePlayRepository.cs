using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Data;
using DodgeBall.Data;

namespace DodgeBall.Service.GamePlay
{
    public class GamePlayRepository : IGamePlayRepository
    {
        private readonly DodgeBallContext _context;
        public GamePlayRepository(IDodgeBallContext context)
        {
            _context = context as DodgeBallContext;
        }
        #region Implementation of IConfigRepository

        public Model.GamePlay Get(int id)
        {

            var gamePlay = _context.GamePlays
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == id );
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

        #endregion
    }

    public interface IGamePlayRepository
    {
        Model.GamePlay Get(int id);
        List<Model.GamePlay> GetByConsumerId(int consumerId);
        Model.GamePlay Add( Model.GamePlay gamePlay);
    }
}
