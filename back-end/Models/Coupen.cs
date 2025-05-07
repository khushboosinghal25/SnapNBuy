namespace EcommercePlatform.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal DiscountAmount { get; set; }
        public int UserId { get; set; }  // Foreign Key to User
        public User User { get; set; }   // Navigation Property to User
    }
}
