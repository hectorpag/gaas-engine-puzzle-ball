﻿using System;
using System.Linq.Expressions;

namespace Data.Interfaces
{
    //public interface IRepository
    //{

    //   // IEnumerable<ClientsCampaignCount> ListClients();

    //}
    public interface IRepository : IReadOnlyRepository
    { 
        // Marks an entity as new
        //void Add(T entity);// Marks an entity as modified
        //void Update(T entity);
        //// Marks an entity to be removed
        //void Delete(T entity);
        //void Delete(Expression<Func<T, bool>> where);

    }
}
        