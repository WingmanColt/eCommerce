using Core.Helpers;
using Entities.Models;
using HireMe.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Services
{
    public class ProductExtensionService : IProductExtensionService
    {
        private readonly IRepository<Images> _imagesRepository;
        private readonly IRepository<Variants> _variantsRepository;

        public ProductExtensionService(IRepository<Images> imagesRepository, IRepository<Variants> variantsRepository)
        {
            _imagesRepository = imagesRepository;
            _variantsRepository = variantsRepository;
        }

        public async Task<OperationResult> CreateImage(IQueryable<Images> entities)
        {
            await _imagesRepository.AddRangeAsync(entities);

            var result = await _imagesRepository.SaveChangesAsync();
            return result;
        }
        public async Task<OperationResult> CreateVariant(IQueryable<Variants> entities)
        {
            await _variantsRepository.AddRangeAsync(entities);
            var result = await _variantsRepository.SaveChangesAsync();
            return result;
        }


        public IAsyncEnumerable<Images> GetImagesAsync(int productId)
        {
            var entities = GetImagesAsNoTracking()
                .Where(x => x.ProductId == productId)
                .AsAsyncEnumerable();

            return entities;
        }
        public IAsyncEnumerable<Variants> GetVariantsAsync(int productId)
        {
            var entities = GetVariantsAsNoTracking()
                .Where(x => x.ProductId == productId)
                .AsAsyncEnumerable();

            return entities;
        }

        private IQueryable<Variants> GetVariantsAsNoTracking()
        {
            return _variantsRepository.Set().AsNoTracking();
        }
        private IQueryable<Images> GetImagesAsNoTracking()
        {
            return _imagesRepository.Set().AsNoTracking();
        }

    }
}
