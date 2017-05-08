using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using GameEngine.Data;

namespace GameEngine.Service.GameEventData
{
    public class GameEventDataRepository : IGameEventDataRepository
    {
        private readonly dbContext _context;
        public GameEventDataRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
        #region Implementation
        
        public Model.GameEventDatum Add(Model.GameEventDatum eventData)
        {
            _context.GameEventDatums.Add(eventData);
            _context.SaveChanges();
            return eventData;
        }

        #endregion
    }

    public interface IGameEventDataRepository
    {
        Model.GameEventDatum Add(Model.GameEventDatum gamePlay);
    }
}
