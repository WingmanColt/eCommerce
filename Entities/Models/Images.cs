namespace Entities.Models
{
    public class Images
    {
        public int Id { get; set; }
        public string Src { get; set; }
        public string Alt { get; set; }
        public int VariantId { get; set; }
        public int ProductId { get; set; }
    }

}
