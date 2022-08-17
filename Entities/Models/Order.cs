using Ardalis.GuardClauses;
using Models;

namespace Entities.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int ProductId { get; set; }
        public bool isPayed { get; set; }
        public int? CategoryId { get; set; }
        public int? WillEarnRewardPoints { get; set; }
        public decimal? Tax { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        public void Update(OrderInput input, User user)
        {
            //Id = input.Id;

            Guard.Against.NegativeOrZero(input.CategoryId, nameof(input.CategoryId));
            CategoryId = input.CategoryId;

            Guard.Against.NegativeOrZero(input.ProductId, nameof(input.ProductId));
            ProductId = input.ProductId;

            WillEarnRewardPoints = input.WillEarnRewardPoints;
            Tax = input.Tax;

            isPayed = input.isPayed;
            UserId = user?.Id;
            CreatedOn = DateTime.Now;
            ExpiredOn = input.ExpiredOn;
        }
    }
 }
