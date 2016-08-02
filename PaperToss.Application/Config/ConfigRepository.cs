using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using Data;
using DodgeBall.Data;

namespace DodgeBall.Service.Config
{
    public class ConfigRepository : IConfigRepository
    {
        private readonly DodgeBallContext _context;
        public ConfigRepository(IDodgeBallContext context)
        {
            _context = context as DodgeBallContext;
        }
        #region Implementation of IConfigRepository

        public Model.Config Get(string campaignKey, int panelId)
        {

            var config = _context.Configs
                .AsNoTracking()
                .FirstOrDefault(c => c.GaasCampaignKey == campaignKey && c.GaasPanelId == panelId)
                         ?? new Model.Config() { GaasCampaignKey = campaignKey, GaasPanelId = panelId, ShowMenu = false, ShowResult = false, LevelNumber = 0 };
            return config;

        }

        public List<Model.Config> GetByCampaign(string campaignKey)
        {
            var configs = _context.Configs
             .AsNoTracking()
             .Where(c => c.GaasCampaignKey == campaignKey).ToList();
            return configs;
        }

        public Model.Config Update(string campaignKey, int panelId, Model.Config config)
        {
            _context.Configs.AddOrUpdate(config);
            _context.SaveChanges();
            return config;
        }

        #endregion
    }

    public interface IConfigRepository
    {
        Model.Config Get(string campaignKey, int panelId);
        List<Model.Config> GetByCampaign(string campaignKey);
        Model.Config Update(string campaignKey, int panelId, Model.Config config);
    }
}
