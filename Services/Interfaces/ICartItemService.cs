using Core.Helpers;
using Entities.Models;

namespace Services.Interfaces
{
    public interface ICartItemService
    {
        Task<OperationResult> Create(CartItem item);
        Task<OperationResult> Delete(int id);
      
        IAsyncEnumerable<CartItem> GetAllByCart(int cartId);
        Task<CartItem> GetByIdAsync(int id);
    }
}