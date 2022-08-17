using Entities.Enums;
using Entities.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.ViewModels.Products
{
    public class ProductVW : BaseViewModel
    {
        public string? Title { get; set; }
        public string? Details { get; set; }
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountRate { get; set; }
        public int CategoryId { get; set; }
        public string? UserId { get; set; }

        public bool IsShippable { get; set; }
        public bool PickupInStore { get; set; }
        public bool IsReturnRequestAllowed { get; set; }

        public double Rating { get; set; } = 0.0;
        public int Views { get; set; } = 0;
        public int RatingVotes { get; set; } = 0;
        public int VotedUsers { get; set; } = 0;

        public ApproveType ApproveType { get; set; }
        public ItemType ItemType { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }
        public PremiumPackage PremiumPackage { get; set; }

        public virtual IAsyncEnumerable<Variants> Variant { get; set; }
        public virtual IAsyncEnumerable<Images> Image { get; set; }

        //public string? int Product { get; set; }
        [NotMapped]
        public string StatementType { get; set; }

    }
}
