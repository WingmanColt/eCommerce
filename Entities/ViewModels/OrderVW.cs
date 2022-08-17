
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.ViewModels
{
    public class OrderVW : BaseViewModel
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public int? WillEarnRewardPoints { get; set; }
        public decimal? Tax { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        [NotMapped]
        public string? StatementType { get; set; }

        public IAsyncEnumerable<OrderVW>? Result { get; set; }

    }
 }
