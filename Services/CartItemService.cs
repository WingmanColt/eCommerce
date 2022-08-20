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
            await _Repository.AddAsync(item);

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

    }
}