using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace EcommercePlatform.Models
{
    public class Review
    {
        public int ReviewId { get; set; }

        [Required]
        public int ProductId { get; set; }  // Foreign key to Product

        [Required]
        [StringLength(1000)]
        public string ReviewText { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; }
       [JsonIgnore]
        public virtual Product? Product { get; set; }  // Navigation property
    }
}
