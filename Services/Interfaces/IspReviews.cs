using Core.Helpers;
using HireMe.StoredProcedures.Enums;

namespace Services.Interfaces
{
    public interface IspReviews
    {
        Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute);
        Task<int> GetAllCountBy(int? productId, bool forSupport);
        Task<IAsyncEnumerable<T>> GetReviewsAsync<T>(int? productId, bool forSupport);
    }
}