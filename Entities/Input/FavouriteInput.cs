using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class FavouriteInput
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }
        public int ProductId { get; set; }
    }
}
