using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using GameEngine.Data;
using GameEngine.Model;

namespace GameEngine.Service.GameDataCapture
{
    public class GameDataCaptureRepository : IGameDataCaptureRepository
    {
        private readonly dbContext _context;
        public GameDataCaptureRepository(IdbContext context)
        {
            _context = context as dbContext;
        }

        #region Implementation of IGameDataCaptureServiceRepository

        public void Add(Model.GameDataCapture gameDataCapture)
        {
            _context.GameDataCaptures.Add(gameDataCapture);
            _context.SaveChanges();
        }

        #endregion
    }

    public interface IGameDataCaptureRepository
    {
        void Add(Model.GameDataCapture gameDataCapture);

    }
}
