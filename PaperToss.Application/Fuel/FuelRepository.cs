using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Data;
using PaperToss.Data;

namespace PaperToss.Service.Fuel
{
    public class FuelRepository : IFuelRepository
    {
        private readonly dbContext _context;
        public FuelRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
        #region Implementation of IConfigRepository

        public Model.Fuel Get(int id)
        {
            var fuel = _context.Fuels
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == id);
            return fuel;
        }

        public List<Model.Fuel> GetByConsumerId(int consumerId)
        {
            var fuel = _context.Fuels
               .AsNoTracking()
               .Where(c => c.ConsumerId == consumerId).ToList();
            return fuel;
        }

        public Model.Fuel Add(Model.Fuel fuel)
        {
            _context.Fuels.AddOrUpdate(fuel);
            _context.SaveChanges();
            return fuel;
        }

        public void MarkAllFuelAsUtilized(int consumerId)
        {
            var sql = $"UPDATE dbo.Fuel SET AutoDiscard = 1 WHERE AutoDiscard = 0 AND UtilizedDate IS NULL AND Consumer_ID = {consumerId}";
            int result = _context.Database.ExecuteSqlCommand(sql);
        }

        public Model.Fuel GetLatest(int consumerId)
        {
            var fuel = _context.Fuels
                 .AsNoTracking()
                 .OrderByDescending(f=>f.Id).FirstOrDefault(c => c.ConsumerId == consumerId && c.AutoDiscard == false);
            return fuel;
        }

        #endregion
    }

    public interface IFuelRepository
    {
        Model.Fuel Get(int id);
        List<Model.Fuel> GetByConsumerId(int consumerId);
        Model.Fuel Add(Model.Fuel fuel);
        void MarkAllFuelAsUtilized(int consumerId);

        /// <summary>
        /// Get the most current fuelID for the consumer
        /// </summary>
        /// <param name="consumerId"></param>
        /// <returns></returns>
        Model.Fuel GetLatest(int consumerId);
    }
}
