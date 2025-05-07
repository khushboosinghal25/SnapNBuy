using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EcommercePlatform.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string Category { get; set; }

        public int StockQuantity { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
        public int Rating{get;set;}
        public ICollection<Review> Reviews { get; set; }  // Navigation property to reviews
    }
}
