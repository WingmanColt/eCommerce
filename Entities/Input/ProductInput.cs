using Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class ProductInput
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Description { get; set; }
        public string VideoUrl { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountRate { get; set; }
        public int CategoryId { get; set; }
        public string UserId { get; set; }

        public bool IsShippable { get; set; }
        public bool PickupInStore { get; set; }
        public bool IsReturnRequestAllowed { get; set; }

        public int ApproveType { get; set; }
        public int ItemType { get; set; }
        public int Status { get; set; }
        public DateTime ExpiredOn { get; set; }
        public int PremiumPackage { get; set; }
        public int Gender { get; set; }

        //[NotMapped]
        public virtual ICollection<Variants> Variant { get; set; }

       // [NotMapped]
        public virtual ICollection<Images> Image { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        }
    }
