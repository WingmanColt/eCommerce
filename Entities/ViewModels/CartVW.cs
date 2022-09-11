
using Entities.Models;
using Entities.ViewModels.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.ViewModels
{
    public class CartVW 
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public double TotalCost { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }

        public IList<ProductVW> Products { get; set; }
        public IAsyncEnumerable<CartItem> CartItems { get; set; }
       // public IAsyncEnumerable<CartVW> Result { get; set; }

    }
 }
