using System.Data.Entity.Migrations;
using System.Linq;
using Data;
using PaperToss.Data;

namespace PaperToss.Service.Consumer
{
    public class ConsumerRepository : IConsumerRepository
    {
        private readonly dbContext _context;
        public ConsumerRepository(IdbContext context)
        {
            _context = context as dbContext;
        }
        #region Implementation of IConsumerRepository

        public Model.Consumer Get(int id)
        {

            var consumer = _context.Consumers
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == id);
            return consumer;
        }

        public Model.Consumer GetByGaasInfo(string campaignKey, int gaasConsumerId)
        {
            var consumer = _context.Consumers
               .AsNoTracking()
               .FirstOrDefault(c => c.GaasConsumerId == gaasConsumerId && c.GaasCampaignKey==campaignKey );
            return consumer;
        }

        public Model.Consumer Get(string campaignKey, int panelId)
        {

            var consumer = _context.Consumers
                .AsNoTracking()
                .FirstOrDefault(c => c.GaasCampaignKey == campaignKey)
                         ?? new Model.Consumer() { GaasCampaignKey = campaignKey };
            return consumer;
        }

        /// <summary>
        /// Add's or Updated consumer.
        /// </summary>
        /// <param name="campaignKey"></param>
        /// <param name="panelId"></param>
        /// <param name="consumer"></param>
        /// <returns></returns>
        public Model.Consumer Update(string campaignKey, int panelId, Model.Consumer consumer)
        {
            _context.Consumers.AddOrUpdate(consumer);
            _context.SaveChanges();
            return consumer;
        }

        #endregion
    }

    public interface IConsumerRepository
    {
        Model.Consumer Get(int id);
        Model.Consumer GetByGaasInfo(string campaignKey,int gaasConsumerId);
        Model.Consumer Get(string campaignKey, int panelId);
        Model.Consumer Update(string campaignKey, int panelId, Model.Consumer consumer);
    }
}
