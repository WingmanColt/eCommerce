using Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class CheckoutInput
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Country { get; set; }
        public string Town { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public bool IsGuest { get; set; }
        public bool PickupAtHome { get; set; }

        public ApproveType ApproveType { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        [NotMapped]
        public virtual ICollection<OrderInput> Orders { get; set; }

        [NotMapped]
        public virtual ICollection<CartItem> CartItems { get; set; }

        [NotMapped]
        public virtual ICollection<ProductIds> ProductIds { get; set; }

        [NotMapped]
        public string StatementType { get; set; }
    }

    public class ProductIds
    {
        public int productId { get; set; }
        public int quantity { get; set; }
    }
}
