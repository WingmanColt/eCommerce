using Core.Helpers;
using HireMe.StoredProcedures.Enums;
using Models;

namespace Services.Interfaces
{
    public interface IspOrder
    {
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, User user);
        Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);
        Task<int> GetAllCountBy(object parameters);
        Task<T> GetByIdAsync<T>(int id);
    }
}