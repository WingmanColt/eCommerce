using Core.Helpers;
using Entities.Models;

namespace Services.Interfaces
{
    public interface IProductExtensionService
    {
        Task<OperationResult> CreateImage(IQueryable<Images> images);
        Task<OperationResult> CreateVariant(IQueryable<Variants> variants);

        IAsyncEnumerable<Images> GetImagesAsync(int productId);
        IAsyncEnumerable<Variants> GetVariantsAsync(int productId);
    }
}