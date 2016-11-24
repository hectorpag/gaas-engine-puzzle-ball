using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Data.Interfaces
{
    public interface IReadOnlyRepository 
    {
        //// Get an entity by int id
        //T GetById(int id);
        //// Get an entity using delegate
        //T Get(Expression<Func<T, bool>> where);
        //// Gets all entities of type T
        //IEnumerable<T> GetAll();
        //// Gets entities using delegate
        //IEnumerable<T> GetMany(Expression<Func<T, bool>> where);
    }

    //public interface IReadOnlyRepository<T> where T : class
    //{
    //    // Get an entity by int id
    //    T GetById(int id);
    //    // Get an entity using delegate
    //    T Get(Expression<Func<T, bool>> where);
    //    // Gets all entities of type T
    //    IEnumerable<T> GetAll();
    //    // Gets entities using delegate
    //    IEnumerable<T> GetMany(Expression<Func<T, bool>> where);
    //}
}
