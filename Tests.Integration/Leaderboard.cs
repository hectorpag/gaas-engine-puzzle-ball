using System;
using System.Linq;
using Autofac;
using AutoMapper;
using GaasPlay.API.Client.Api;
using GameEngine.Data;
using GameEngine.Service;
using GameEngine.Service.Config;
using GameEngine.Service.Configuration;
using GameEngine.Service.Consumer;
using GameEngine.Service.Score;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests.Integration
{
    [TestClass]
    public class Leaderboard
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
            AutoMapperConfiguration.RegisterMappings();

            var builder = new ContainerBuilder();

            builder.RegisterType<GameEngineConfig>();
            builder.RegisterType<dbContext>().As<IdbContext>();

            //Repositories
            builder.RegisterAssemblyTypes(typeof(ConfigRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces();

            //Services
            builder.RegisterAssemblyTypes(typeof(ConfigService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces();

            _container = builder.Build();
            _scope = _container.BeginLifetimeScope();
        }

        [TestMethod]
        public void Get()
        {
            var svc = _scope.Resolve<IScoreService>();

            var rs = svc.GetLeaderboardScore(
                campaignKey,
                panelId,
                ScoreService.AccumulationTypes.Max,
                ScoreService.SortOrders.Descending,
                null);

            Assert.IsNotNull(rs);

            rs = svc.GetLeaderboardScore(
                campaignKey,
                panelId,
                ScoreService.AccumulationTypes.Max,
                ScoreService.SortOrders.Descending,
                new DateTime(2017, 5, 17));

            Assert.IsNotNull(rs);
        }
    }
}
