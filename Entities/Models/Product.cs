using Ardalis.GuardClauses;
using Entities.Enums;
using Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Product
    {
        public Product()
        {
            Image = new HashSet<Images>();
            Variant = new HashSet<Variants>();
        }

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

        public double Rating { get; set; } = 0.0;
        public int Views { get; set; } = 0;
        public int RatingVotes { get; set; } = 0;
        public int VotedUsers { get; set; } = 0;

        public PremiumPackage PremiumPackage { get; set; }
        public ApproveType ApproveType { get; set; }
        public ItemType ItemType { get; set; }
        public Status Status { get; set; }
        public Gender Gender { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        [NotMapped]
        public virtual ICollection<Variants> Variant { get; set; }

        [NotMapped]
        public virtual ICollection<Images> Image { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        public void Update(ProductInput input, ApproveType approved, string userId)
        {
            Id = input.Id;

            Guard.Against.NullOrEmpty(input.Title, nameof(input.Title));
            Title = input.Title;

            Guard.Against.NullOrEmpty(input.Details, nameof(input.Details));
            Details = input.Details;

            Guard.Against.NullOrEmpty(input.Description, nameof(input.Description));
            Description = input.Description;

            Guard.Against.NegativeOrZero(input.CategoryId, nameof(input.CategoryId));
            CategoryId = input.CategoryId;

            VideoUrl = input.VideoUrl;

            IsShippable = input.IsShippable;
            IsReturnRequestAllowed = input.IsReturnRequestAllowed;
            PickupInStore = input.PickupInStore;

            ApproveType = approved;
            ItemType = (ItemType)Enum.Parse(typeof(ItemType), input.ItemType.ToString());
            Status = (Status)Enum.Parse(typeof(Status), input.Status.ToString());
            Gender = (Gender)Enum.Parse(typeof(Gender), input.Gender.ToString());

            Quantity = input.Quantity;
            Price = input.Price;
            DiscountRate = input.DiscountRate;
            PremiumPackage = (PremiumPackage)Enum.Parse(typeof(PremiumPackage), input.PremiumPackage.ToString());

            Image = input.Image;
            Variant = input.Variant;

            if(!String.IsNullOrEmpty(userId))
            UserId = userId;

            CreatedOn = DateTime.Now;
            ExpiredOn = DateTime.Now.AddDays(90);

        }

    }
}
