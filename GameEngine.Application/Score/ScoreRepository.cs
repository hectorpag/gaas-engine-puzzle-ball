using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Data;
using GameEngine.Data;

namespace GameEngine.Service.Score
{
    public class ScoreRepository : IScoreRepository
    {
        private readonly dbContext _context;
        public ScoreRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
       
        #region Implementation of IScoreRepository

        public Model.Score Get(int id)
        {
            var score = _context.Scores
              .AsNoTracking()
              .FirstOrDefault(c => c.Id == id);
            return score;
        }
        public List<Model.Score> GetByConsumerId(int consumerId)
        {
            var scores = _context.Scores
             .AsNoTracking()
             .Where(c => c.ConsumerId == consumerId).ToList();
            return scores;
        }
        public Model.Score Add(Model.Score score)
        {
            _context.Scores.AddOrUpdate(score);
            _context.SaveChanges();
            return score;
        }

        public IEnumerable<IGrouping<int?, Model.Score>> GetWinners(Func<Model.Score, bool> where = null)
        {
            return (@where == null)
                ? _context.Scores.AsNoTracking().GroupBy(gr => gr.ConsumerId) 
                : _context.Scores.AsNoTracking().Where(@where).GroupBy(gr => gr.ConsumerId);
        }

        #endregion
    }

    public interface IScoreRepository
    {
        Model.Score Get(int id);
        List<Model.Score> GetByConsumerId(int consumerId);
        Model.Score Add( Model.Score score);
        IEnumerable<IGrouping<int?, Model.Score>> GetWinners(Func<Model.Score, bool> where = null);
    }
}
