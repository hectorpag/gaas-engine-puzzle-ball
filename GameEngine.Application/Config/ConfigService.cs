#region

using System.Collections.Generic;
using AutoMapper;
using GameEngine.Model.GameEngine;
using GameEngine.Service.Interfaces;
using GameEngine.Service.RedisCaching;
using GameEngine.ViewModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;

#endregion

namespace GameEngine.Service.Config
{
    public class ConfigService : IConfigService
    {
        private readonly IConfigRepository _configRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
        private readonly ICacheManager _cacheManager;

        #region Cache Keys
        /// <summary>
        /// Key for Config Caching
        /// </summary>
        /// <remarks>
        /// {0} : CampaignKey
        /// {1} : PanelId
        /// </remarks>
        public const string CONFIG_KEYBY_CAMPAIGN_PANELID = "GameEngine.config.bycampaign&panelid-{0}-{1}";

        /// <summary>
        /// Key for Config Caching
        /// </summary>
        /// <remarks>
        /// {0} : CampaignKey
        /// </remarks>
        public const string CONFIG_KEYBY_CAMPAIGN = "GameEngine.config.bycampaign-{0}";


        public const string CONFIG_PATTERN_KEY = "GameEngine.config";

        private string GetKey(string campaignKey)
        {
            return string.Format(CONFIG_KEYBY_CAMPAIGN, campaignKey);
        }

        private string GetKey(string campaignKey, int panelId)
        {
            return string.Format(CONFIG_KEYBY_CAMPAIGN_PANELID, campaignKey, panelId);
        }
        #endregion

        public ConfigService(IConfigRepository configRepository, ICacheManager cacheManager)
        {
            _configRepository = configRepository;
            _cacheManager = cacheManager;
        }

        //{
        //public void Update<T>(T obj, params Expression<Func<T, object>>[] propertiesToUpdate) where T : class
        //    _context.Set<T>().Attach(obj);
        //    propertiesToUpdate.ToList().ForEach(p => _context.Entry(obj).Property(p).IsModified = true);
        //    _context.SaveChanges();
        //}

        //Generic Update in case need to attach and update in one call

        #region Implementation of IConfigService

        public ConfigViewModel Get(string campaignKey, int panelId)
        {
            var cacheModel = _cacheManager.Get(GetKey(campaignKey, panelId), () =>
            {
                var config = _configRepository.Get(campaignKey, panelId);
                var viewModel = _mapper.Map<ConfigViewModel>(config);

                if (string.IsNullOrWhiteSpace(viewModel.GameConfigJson))
                {
                    viewModel.GameConfigJson = JsonConvert.SerializeObject(SetupStarterFields());
                }
                viewModel.GameConfigJson = JToken.Parse(viewModel.GameConfigJson).ToString(Formatting.Indented);
                return viewModel;
            });

            return cacheModel;
        }

        public List<ConfigViewModel> GetByCampaign(string campaignKey)
        {
            var cacheModel = _cacheManager.Get(GetKey(campaignKey), () =>
            {
                var configs = _configRepository.GetByCampaign(campaignKey);
                var viewModel = new List<ConfigViewModel>();
                foreach (var config in configs)
                {
                    var vm = _mapper.Map<ConfigViewModel>(config);
                    if (string.IsNullOrWhiteSpace(vm.GameConfigJson))
                    {
                        vm.GameConfigJson = JsonConvert.SerializeObject(SetupStarterFields());
                    }
                    vm.GameConfigJson = JToken.Parse(vm.GameConfigJson).ToString(Formatting.Indented);
                    viewModel.Add(vm);
                }
                return viewModel;
            });
            return cacheModel;
        }

        public ConfigViewModel Update(string campaignKey, int panelId, ConfigViewModel configViewModel)
        {
            var config = _mapper.Map<Model.Config>(configViewModel);

            config.GameConfigJson = string.IsNullOrWhiteSpace(config.GameConfigJson) 
                ? JsonConvert.SerializeObject(SetupStarterFields()) 
                : JToken.Parse(config.GameConfigJson).ToString(Formatting.None);

            _configRepository.Update(campaignKey, panelId, config);

            //cache
            _cacheManager.RemoveByPattern(GetKey(campaignKey,panelId));

            var viewModel = _mapper.Map<ConfigViewModel>(config);
            viewModel.GameConfigJson = JToken.Parse(config.GameConfigJson).ToString(Formatting.Indented);
            return viewModel;
        }

        public void ClearAllCache()
        {
            _cacheManager.RemoveByPattern(CONFIG_PATTERN_KEY);
        }

        #endregion

        private List<FieldDefinition> SetupStarterFields()
        {
            return new List<FieldDefinition>()
            {
                new FieldDefinition()
                {
                    Label = "Label Text",
                    Name = "Field1",
                    Type = FieldDefinition.Types.Text,
                    Value = ""
                }
            };
        }
    }

    public interface IConfigService
    {
        ConfigViewModel Get(string campaignKey, int panelId);
        List<ConfigViewModel> GetByCampaign(string campaignKey);
        ConfigViewModel Update(string campaignKey, int panelId, ConfigViewModel configViewModel);

        void ClearAllCache();
    }
}