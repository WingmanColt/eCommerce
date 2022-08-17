using Core.Helpers;
using Entities.Models;
using HireMe.StoredProcedures.Enums;
using Models;

namespace Services.Interfaces
{
    public interface IspCategories
    {
        Task<OperationResult> CRUD(object? parameters, ActionEnum action, bool AutoFindParams = false, string skipAttribute = null, User user = null);
        Task<IAsyncEnumerable<T>> GetAll<T>(GetActionEnum state);
        Task<int> GetAllCountBy(object parameters);
        Task<OperationResult> SeedCategories();
    }
}