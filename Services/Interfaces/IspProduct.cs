﻿using Core.Helpers;
using HireMe.StoredProcedures.Enums;
using Models;

namespace Services.Interfaces
{
    public interface IspProduct
    {
        Task<bool> AddRating(object parameters);
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string userId);
        Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);
        Task<int> GetAllCountBy(object parameters);
        Task<T> GetByIdAsync<T>(int id);
        Task<T> GetByTitleAsync<T>(string title);

    }
}