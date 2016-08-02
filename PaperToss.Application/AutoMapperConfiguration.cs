using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PaperToss.Model;
using PaperToss.ViewModel;

namespace PaperToss.Service
{
    public static class AutoMapperConfiguration
    {
        public static MapperConfiguration MapperConfiguration;

        public static void RegisterMappings()
        {
            MapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Model.Config, ConfigViewModel>().ReverseMap();
                cfg.CreateMap<Model.Consumer, ConsumerViewModel>().ReverseMap();
                cfg.CreateMap<Model.Score, ScoreViewModel>().ReverseMap();
                cfg.CreateMap<Model.GamePlay, GamePlayViewModel>().ReverseMap();
                cfg.CreateMap<Model.Fuel, FuelViewModel>().ReverseMap();
                cfg.CreateMap<Model.UniqueGamePlayView, UniqueGamePlayViewViewModel>().ReverseMap();
                cfg.CreateMap<Model.GameDataCapture, GameDataCaptureViewModel>().ReverseMap();
            });
        }

    }
}
