using Ardalis.GuardClauses;

namespace Entities.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CheckoutId { get; set; }
        public bool isPayed { get; set; }
        public int? Quantity { get; set; }
        
        public int? WillEarnRewardPoints { get; set; }
        public decimal? Tax { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        public void Update(OrderInput input)
        {
            //Id = input.Id;

            Guard.Against.NegativeOrZero(input.Quantity, nameof(input.Quantity));
            Quantity = input.Quantity;

            Guard.Against.NegativeOrZero(input.ProductId, nameof(input.ProductId));
            ProductId = input.ProductId;

            WillEarnRewardPoints = input.WillEarnRewardPoints;
            Tax = input.Tax;

            isPayed = input.isPayed;
            CheckoutId = input.CheckoutId;

            CreatedOn = DateTime.Now;
            ExpiredOn = DateTime.Now.AddDays(30);
        }
    }
 }
