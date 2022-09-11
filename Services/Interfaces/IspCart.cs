using Core.Helpers;
using HireMe.StoredProcedures.Enums;

namespace Services.Interfaces
{
    public interface IspCart
    {
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string userId);
        Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);
        Task<int> GetAllCountBy(object parameters);
<<<<<<< HEAD
        Task<T> GetByUserIdAsync<T>(string userId);
=======
        Task<T> GetByIdAsync<T>(int id);
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
    }
}