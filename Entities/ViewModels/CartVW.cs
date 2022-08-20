
using Entities.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.ViewModels
{
    public class CartVW : BaseViewModel
    {
        public string UserId { get; set; }
        public double TotalCost { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }

        // [NotMapped]
        public virtual ICollection<Product> Products { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        public IAsyncEnumerable<CartVW> Result { get; set; }

    }
 }
