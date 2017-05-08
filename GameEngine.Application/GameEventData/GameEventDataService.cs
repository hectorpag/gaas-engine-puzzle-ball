using System;
using System.Collections.Generic;
using AutoMapper;
using GameEngine.ViewModel;
using Newtonsoft.Json;

namespace GameEngine.Service.GameEventData
{
    public class GameEventDataService : IGameEventDataService
    {
        private readonly IGameEventDataRepository _repository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();

        public GameEventDataService(IGameEventDataRepository repository)
        {
            _repository = repository;
        }

        #region Implementation

        public GameEventViewModel Add(GameEventViewModel vm)
        {
            var eventData = new Model.GameEventDatum()
            {
                Id = vm.Id,
                ConsumerId = Int32.Parse(vm.ConsumerId),
                FuelId = vm.FuelId,
                EventDate = vm.EventDate,
                DataJson = JsonConvert.SerializeObject(vm.EventData)
            };
            _repository.Add(eventData);
            return vm;
        }

        #endregion
    }

    public interface IGameEventDataService
    {
        GameEventViewModel Add(GameEventViewModel gamePlayViewModel);
    }
}
