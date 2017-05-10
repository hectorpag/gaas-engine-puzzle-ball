using System;
using System.Linq;
using Autofac;
using GaasPlay.API.Client.Api;
using GameEngine.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests.Integration
{
    [TestClass]
    public class Gaas
    {
        private readonly string gaasPlayApiBaseUrl = "https://gaasdevgaasplayapi.azurewebsites.net/";
        private static IContainer _container;
        private static ILifetimeScope _scope;

        private readonly string campaignKey = "c0da029691a1407ba5ae68ab7e5e2e07";
        private readonly string consumerId = "e4dbb25c-78a0-477d-9927-04c1049cba46";
        private readonly int panelId = 1722;

        [TestInitialize]
        public void Startup()
        {
            var builder = new ContainerBuilder();

            builder.Register<IGaasPlayProfileApi>(
                c => (new GaasPlayProfileApi(new GaasPlay.API.Client.Client.ApiClient(
                    gaasPlayApiBaseUrl,
                    new GaasPlay.API.Client.Client.Configuration(), null))));

            builder.Register<ICampaignQuestionApi>(
                c => (new GaasPlayQuestionApi(new GaasPlay.API.Client.Client.ApiClient(
                    gaasPlayApiBaseUrl, 
                    new GaasPlay.API.Client.Client.Configuration(), null))));

            _container = builder.Build();
            _scope = _container.BeginLifetimeScope();
        }

        [TestMethod]
        public void GetUser()
        {
            var svc = _scope.Resolve<IGaasPlayProfileApi>();
            var rs = svc.GetPortalUser(consumerId);
            Assert.IsNotNull(rs);
        }

        [TestMethod]
        public void GetAndAnswerQuestion()
        {
            var svc = _scope.Resolve<ICampaignQuestionApi>();
            var q = svc.GetNextCampaignQuestion(campaignKey, consumerId);
            Assert.IsNotNull(q);
            Assert.IsNotNull(q.Data);

            var a = svc.SubmitAnswer(campaignKey, consumerId, 
                q.Data.CampaignQuestionId, q.Data.CampaignQuestionResponses.First().ResponseId.ToString());
            Assert.IsNotNull(a);
        }
    }
}
