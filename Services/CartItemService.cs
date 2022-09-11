using Core.Helpers;
using Entities.Models;
using HireMe.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Services
{
    public class CartItemService : ICartItemService
    {
        private readonly IRepository<CartItem> _Repository;

        public CartItemService(IRepository<CartItem> Repository)
        {
            _Repository = Repository;
        }

        public async Task<OperationResult> Create(CartItem item)
        {
            if (await GetByIdAsync(item.ProductId) is not null)
                return OperationResult.FailureResult("Product is already in your cart.");

            await _Repository.AddAsync(item);

            var result = await _Repository.SaveChangesAsync();
            return result;
        }

        public async Task<OperationResult> Delete(int id)
        {
            var entity = await GetByIdAsync(id);

            if (entity is null)
                return OperationResult.FailureResult("There is no product like that in your cart.");

            _Repository.Delete(entity);

            var result = await _Repository.SaveChangesAsync();
            return result;
        }
        public IAsyncEnumerable<CartItem> GetAllByCart(int cartId)
        {
            var entities = GetAllAsNoTracking()
                .Where(x => x.CartId == cartId)
                .AsAsyncEnumerable();

            return entities;
        }


        private IQueryable<CartItem> GetAllAsNoTracking()
        {
            return _Repository.Set().AsNoTracking();
        }
        public async Task<CartItem> GetByIdAsync(int id)
        {
            var ent = await _Repository.Set().FirstOrDefaultAsync(p => p.ProductId == id);

            return ent;
        }


    }
}