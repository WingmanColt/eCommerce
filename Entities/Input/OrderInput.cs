namespace Entities.Models
{
    public class OrderInput
    {
        public int CheckoutId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int? WillEarnRewardPoints { get; set; }
        public decimal? Tax { get; set; }
        public bool isPayed { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }
    }

}
