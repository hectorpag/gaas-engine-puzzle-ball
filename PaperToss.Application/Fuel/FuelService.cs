using System.Collections.Generic;
using AutoMapper;
using DodgeBall.Service.Fuel;
using DodgeBall.ViewModel;

namespace DodgeBall.Service.Fuel
{
    public class FuelService : IFuelService
    {
        private readonly IFuelRepository _fuelRepository;
        private readonly IMapper _mapper = AutoMapperConfiguration.MapperConfiguration.CreateMapper();
       
        public FuelService(IFuelRepository fuelRepository)
        {
            _fuelRepository = fuelRepository;
        }

        #region Implementation of IFuelService

        public FuelViewModel Get(int id)
        {
            var fuel = _fuelRepository.Get(id);
            var viewModel = _mapper.Map<FuelViewModel>(fuel);
            return viewModel;
        }

        public List<FuelViewModel> GetByConsumerId(int consumerId)
        {
            var fuelList = _fuelRepository.Get(consumerId);
            var viewModel = _mapper.Map<List<FuelViewModel>>(fuelList);
            return viewModel;
        }

        public FuelViewModel Add(FuelViewModel fuelViewModel)
        {
            var fuel = _mapper.Map<Model.Fuel>(fuelViewModel);
            _fuelRepository.Add(fuel);
            var viewModel = _mapper.Map<FuelViewModel>(fuel);
            return viewModel;
        }
        public FuelViewModel CheckFuel(int consumerId)
        {
            //Get the latest fuel
            var fuel = _fuelRepository.GetLatest(consumerId);
            //TODO : if fuel is null create it. Also make sure to reset it.
            //if ()
            //{
                
            //}
            var viewModel = _mapper.Map<FuelViewModel>(fuel);
            return viewModel;
        }

        public FuelViewModel CheckFuel(GaasInfoViewModel gaasInfoViewModel, ConsumerViewModel consumer, int levelNumber)
        {
            //Get the latest fuel
            var fuel = _fuelRepository.GetLatest(consumer.Id);
            //TODO : if fuel is null create it. Also make sure to reset it.
            //if ()
            //{

            //}
            var viewModel = _mapper.Map<FuelViewModel>(fuel);
            return viewModel;
        }

        public void ResetUnusedFuel(int consumerId)
        {
            _fuelRepository.MarkAllFuelAsUtilized(consumerId);
        }
        
        #endregion
    }

    public interface IFuelService
    {
        FuelViewModel Get(int id);
        List<FuelViewModel> GetByConsumerId(int consumerId);
        FuelViewModel Add(FuelViewModel fuelViewModel);
        FuelViewModel CheckFuel(int consumerId);

        FuelViewModel CheckFuel(GaasInfoViewModel gaasInfoViewModel, ConsumerViewModel consumer, int levelNumber);
        /// <summary>
        /// Marks AutoDiscard to true for all fuels that are not utilized.
        /// This prevents us from using wrong fuels
        /// </summary>
        /// <param name="consumerId"></param>
        void ResetUnusedFuel(int consumerId);

       
    }
}
