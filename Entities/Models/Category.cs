using Ardalis.GuardClauses;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Category
    {
        public int Id { get; set; }
        public int ProductsCount { get; set; }

        public string? Title { get; set; }
        public string? Icon { get; set; }

        [NotMapped]
        public CategoriesEnum CategoriesEnum { get; set; }

        public void Update(CategoryInput Input)
        {
            Guard.Against.NullOrEmpty(Input.Title, nameof(Input.Title));
            Title = Input.Title;

            Icon = Input.Icon;
            ProductsCount = Input.ProductsCount;
        }
    }
}
