using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using PaperToss.Data;
using PaperToss.Service.Config;
using PaperToss.Service.Configuration;
using PaperToss.Service.Interfaces;
using PaperToss.Service.RedisCaching;

namespace PaperToss.Web
{
    public class AutofacConfig
    {
        public static void Run()
        {
            SetAutofacContainer();
            //Configure Automapper
        }

        private static void SetAutofacContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<PaperTossConfig>();
            builder.RegisterType<dbContext>().As<IdbContext>().InstancePerRequest();
            builder.RegisterType<RedisCacheManager>().As<ICacheManager>().InstancePerLifetimeScope();
            builder.RegisterType<RedisConnectionWrapper>().As<IRedisConnectionWrapper>().InstancePerLifetimeScope();
           
                
           //Repositories
            builder.RegisterAssemblyTypes(typeof(ConfigRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces().InstancePerRequest();

            //Services
            builder.RegisterAssemblyTypes(typeof(ConfigService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();
            

            IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver((IContainer)container);
        }
    }
}