using Core.Helpers;
using HireMe.StoredProcedures.Enums;

namespace Services.Interfaces
{
    public interface IspCheckout
    {
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string? userId);
        Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);
        Task<int> GetAllCountBy(object parameters);
        Task<T> GetByUserIdAsync<T>(string id);
    }
}