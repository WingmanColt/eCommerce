using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class ReviewInput
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? ProductStars { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string About { get; set; }
        public bool sendToSupport { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
