using Core.Helpers;
using Entities.Models;
using Entities.ViewModels.Products;
using HireMe.StoredProcedures.Enums;
using Models;

namespace Services.Interfaces
{
    public interface IspProduct
    {
        Task<bool> AddRating(object parameters);
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string userId);
        Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);
        Task<IAsyncEnumerable<ProductVW>> GetAll2(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute);

        Task<int> GetAllCountBy(object parameters);
<<<<<<< HEAD
        Task<ProductVW> GetByIdAsync(int id);
=======
        Task<T> GetByIdAsync<T>(int id);
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
        Task<T> GetByTitleAsync<T>(string title);

    }
}