using System;
using System.Data.SqlClient;
using System.Linq;
using Data;
using GameEngine.Data;
using GameEngine.Model;
using GameEngine.ViewModel;

namespace GameEngine.Service.Game

{
    public class GameRepository : IGameRepository// Repository<Client>, IClientRepository
    {
        private readonly dbContext _context;

        public GameRepository(IdbContext context)
        {
            _context = context as dbContext;
        }

      

    }

    public interface IGameRepository
    {
       
    }
}
