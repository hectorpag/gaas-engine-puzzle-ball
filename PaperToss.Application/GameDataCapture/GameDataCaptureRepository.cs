using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using DodgeBall.Data;
using DodgeBall.Model;

namespace DodgeBall.Service.GameDataCapture
{
    public class GameDataCaptureRepository : IGameDataCaptureRepository
    {
        private readonly DodgeBallContext _context;
        public GameDataCaptureRepository(IDodgeBallContext context)
        {
            _context = context as DodgeBallContext;
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
