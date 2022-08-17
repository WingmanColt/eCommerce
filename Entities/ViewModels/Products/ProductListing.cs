namespace Entities.ViewModels.Products
{
    public class ProductListing 
    {
        public Pager? Pager { get; set; }
        public IAsyncEnumerable<ProductVW>? Result { get; set; }
    }
}
