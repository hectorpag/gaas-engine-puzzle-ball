using Data;
using DodgeBall.Data;

namespace DodgeBall.Service.Game

{
    public class GameRepository : IGameRepository// Repository<Client>, IClientRepository
    {
        private readonly DodgeBallContext _context;

        public GameRepository(IDodgeBallContext context)
        {
            _context = context as DodgeBallContext;
        }
       
    }

    public interface IGameRepository
    {
    }
}
