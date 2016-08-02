using Data;
using PaperToss.Data;

namespace PaperToss.Service.Game

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
