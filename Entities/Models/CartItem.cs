﻿using Entities.ViewModels.Products;

namespace Entities.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CartId { get; set; }
    }
}
