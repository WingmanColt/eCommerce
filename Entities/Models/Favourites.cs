using Ardalis.GuardClauses;
using Entities.Enums;
using Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Favourites
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }
        public int ProductId { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        public void Update(FavouriteInput input, string userId)
        {
            Id = input.Id;

            ProductId = input.ProductId;

            if(!String.IsNullOrEmpty(userId))
            UserId = userId;

            ExpiredOn = DateTime.Now.AddDays(90);

        }

    }
}
