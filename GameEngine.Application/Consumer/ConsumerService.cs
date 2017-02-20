using System;
using System.Collections.Generic;
using AutoMapper;
using GameEngine.Model.Gaas.Models;
using GameEngine.Model.GaasModels;
using GameEngine.Service.Interfaces;
using GameEngine.Service.RedisCaching;
using GameEngine.ViewModel;
using Newtonsoft.Json;
using Shearnie.Net.Web;
using GaasPlay.API.Client.Api;
namespace GameEngine.Service.Consumer
{
    public class ConsumerService : IConsumerService
    {
        private readonly IConsumerRepository _consumerRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
        private readonly ICacheManager _cacheManager;
        private readonly IGaasPlayProfileApi _profileApi;

        #region Cache Keys
        /// <summary>
        /// Key for Consumer Caching
        /// </summary>
        /// <remarks>
        /// {0} : CampaignKey
        /// {1} : GaasConsumerId
        /// </remarks>
        public const string CONSUMER_KEYBY_CAMPAIGN_GAASCONSUMERID = "GameEngine.consumer.bygaasInfo-{0}-{1}";


        public const string CONSUMER_PATTERN_KEY = "GameEngine.consumer";

        private string GetKey(string campaignKey, string gaasConsumerId)
        {
            return string.Format(CONSUMER_KEYBY_CAMPAIGN_GAASCONSUMERID, campaignKey, gaasConsumerId);
        }

        #endregion
        public ConsumerService(IConsumerRepository consumerRepository, ICacheManager cacheManager, IGaasPlayProfileApi profileApi)
        {
            _consumerRepository = consumerRepository;
            _cacheManager = cacheManager;
        }
        #region Implementation of IConsumerService

        public ConsumerViewModel Get(GaasInfoViewModel gaasInfoViewModel)
        {
            var cacheModel = _cacheManager.Get(GetKey(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId), () =>
             {
                 var consumer = _consumerRepository.GetByGaasInfo(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.ConsumerId);
                 var viewModel = _mapper.Map<ConsumerViewModel>(consumer);
                 return viewModel;
             });

            return cacheModel;

        }
        /// <summary>
        /// Adds or Updated a consumer
        /// </summary>
        /// <param name="campaignKey"></param>
        /// <param name="panelId"></param>
        /// <param name="consumerViewModel"></param>
        /// <returns></returns>
        public ConsumerViewModel Update(string campaignKey, int panelId, ConsumerViewModel consumerViewModel)
        {
            var consumer = _mapper.Map<Model.Consumer>(consumerViewModel);
            try
            {
                _consumerRepository.Update(campaignKey, panelId, consumer);
            }
            catch (Exception)
            {

                consumer = _consumerRepository.GetByGaasInfo(campaignKey, consumer.GaasConsumerId);

            }


            //Remove cache
            _cacheManager.RemoveByPattern(GetKey(campaignKey, consumer.GaasConsumerId));

            var viewModel = _mapper.Map<ConsumerViewModel>(consumer);
            return viewModel;
        }

        public ConsumerViewModel CheckConsumer(GaasInfoViewModel gaasInfoViewModel)
        {
            var consumer = Get(gaasInfoViewModel);
            if (consumer != null) return consumer;
            //Grab details of consumer from GAAS
            var gaasConsumer = GetConsumerDetails(gaasInfoViewModel);
            if (gaasConsumer.Error == null)
            {
                consumer = Update(gaasInfoViewModel.CampaignKey, gaasInfoViewModel.PanelId, new ConsumerViewModel() { GaasCampaignKey = gaasInfoViewModel.CampaignKey, GaasConsumerId = gaasConsumer.Id, GaasConsumerName = gaasConsumer.UserName, GaasGender = String.Empty });
            }
            return consumer;
        }

        public void ClearAllCache()
        {
            //Remove cache
            _cacheManager.RemoveByPattern(CONSUMER_PATTERN_KEY);
        }

        private Model.Gaas.Models.Consumer GetConsumerDetails(GaasInfoViewModel gaasInfoViewModel)
        {
            try
            {
                var gaasConsumer = _profileApi.GetPortalUser(gaasInfoViewModel.ConsumerId.ToString());
                var consModel = gaasConsumer.Data;
                if (gaasConsumer.StatusCode == 200 && consModel != null)
                {
                    return new Model.Gaas.Models.Consumer()
                    {
                        Id = consModel.Id,
                        Email = consModel.Email,
                        AccessFailedCount = consModel.AccessFailedCount,
                        EmailConfirmed = consModel.EmailConfirmed,
                        LockoutEnabled = consModel.LockoutEnabled,
                        LockoutEndDateUtc = consModel.LockoutEndDateUtc,
                        PasswordHash = consModel.PasswordHash,
                        PhoneNumber = consModel.PhoneNumber,
                        PhoneNumberConfirmed = consModel.PhoneNumberConfirmed,
                        SecurityStamp = consModel.SecurityStamp,
                        TwoFactorEnabled = consModel.TwoFactorEnabled,
                        UserName = consModel.UserName
                    };
                }
                else
                    return new Model.Gaas.Models.Consumer
                    {
                        Error = new Error { Code = (int)ErrorTypes.UnknownError, Message = "Consumer Not found." }
                    };
            }
            catch (Exception ex)
            {
                //TODO : Log error
                return new Model.Gaas.Models.Consumer
                {
                    Error = new Error { Code = (int)ErrorTypes.UnknownError, Message = ex.Message }
                };
            }
        }
        #endregion
    }

    public interface IConsumerService
    {
        ConsumerViewModel Get(GaasInfoViewModel gaasInfoViewModel);

        ConsumerViewModel Update(string campaignKey, int panelId, ConsumerViewModel consumerViewModel);

        ConsumerViewModel CheckConsumer(GaasInfoViewModel gaasInfoViewModel);

        void ClearAllCache();
    }
}
