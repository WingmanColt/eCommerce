using Ardalis.GuardClauses;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class CategoryInput
    {
        public string Title { get; set; }
        public string Icon { get; set; }
        public int ProductsCount { get; set; }

        [NotMapped]
        public CategoriesEnum CategoriesEnum { get; set; }
    }
    public enum CategoriesEnum
    {
        Increment = 0,
        Decrement = 1
    }
}
