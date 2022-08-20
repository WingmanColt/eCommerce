using Core.Helpers;
using Entities.Models;

namespace Services.Interfaces
{
    public interface ICartItemService
    {
        Task<OperationResult> Create(CartItem item);
        IAsyncEnumerable<CartItem> GetAllByCart(int cartId);
    }
}