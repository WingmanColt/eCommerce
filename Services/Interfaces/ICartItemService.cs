using Core.Helpers;
using Entities.Models;

namespace Services.Interfaces
{
    public interface ICartItemService
    {
        Task<OperationResult> Create(CartItem item);
<<<<<<< HEAD
        Task<OperationResult> Delete(int id);
      
        IAsyncEnumerable<CartItem> GetAllByCart(int cartId);
        Task<CartItem> GetByIdAsync(int id);
=======
        IAsyncEnumerable<CartItem> GetAllByCart(int cartId);
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
    }
}