using Ardalis.GuardClauses;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Review
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

        [NotMapped]
        public string StatementType { get; set; }

        public void Update(ReviewInput input)
        {
            Id = input.Id;

            //Guard.Against.NegativeOrZero(input.ProductId, nameof(input.ProductId));
            ProductId = input.ProductId;
            ProductStars = input.ProductStars;

            Guard.Against.NullOrEmpty(input.Firstname, nameof(input.Firstname));
            Firstname = input.Firstname;

            Guard.Against.NullOrEmpty(input.Lastname, nameof(input.Lastname));
            Lastname = input.Lastname;

            Guard.Against.NullOrEmpty(input.Email, nameof(input.Email));
            Email = input.Email;

            Guard.Against.NullOrEmpty(input.About, nameof(input.About));
            About = input.About;

            sendToSupport = input.sendToSupport;
            CreatedOn = DateTime.Now;
        }

    }
}
