using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class CartInput
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public double TotalCost { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}
