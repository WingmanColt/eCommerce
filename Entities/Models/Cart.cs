﻿using Ardalis.GuardClauses;
using Entities.Enums;
using Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Cart
    {
        public Cart()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public double TotalCost { get; set; }
        public int TotalItems { get; set; }
        public DateTime ExpiredOn { get; set; }

       // [NotMapped]
        public virtual ICollection<Product> Products { get; set; }

        [NotMapped]
        public string StatementType { get; set; }

        public void Update(CartInput input, string userId)
        {
            Id = input.Id;

            Products = input.Products;

            if(!String.IsNullOrEmpty(userId))
            UserId = userId;

            ExpiredOn = DateTime.Now.AddDays(90);

        }

    }
}