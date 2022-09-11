using Entities.Models;

namespace Entities.ViewModels.Products
{
    public class ProductListingVW 
    {
       //public Pager? Pager { get; set; }
        public virtual IAsyncEnumerable<IEnumerable<Product>> Products { get; set; }
        public virtual IAsyncEnumerable<IEnumerable<Variants>> Variant { get; set; }
        public virtual IAsyncEnumerable<IEnumerable<Images>> Image { get; set; }
    }
}
