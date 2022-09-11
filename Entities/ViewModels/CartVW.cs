
using Entities.Models;
<<<<<<< HEAD
using Entities.ViewModels.Products;
=======
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.ViewModels
{
<<<<<<< HEAD
    public class CartVW 
    {
        public int Id { get; set; }
=======
    public class CartVW : BaseViewModel
    {
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
        public string UserId { get; set; }
        public double TotalCost { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }

<<<<<<< HEAD
        public IList<ProductVW> Products { get; set; }
        public IAsyncEnumerable<CartItem> CartItems { get; set; }
       // public IAsyncEnumerable<CartVW> Result { get; set; }
=======
        // [NotMapped]
        public virtual ICollection<Product> Products { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        public IAsyncEnumerable<CartVW> Result { get; set; }
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190

    }
 }
