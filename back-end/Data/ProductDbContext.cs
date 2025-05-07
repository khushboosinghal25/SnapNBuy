using Microsoft.EntityFrameworkCore;

namespace EcommercePlatform.Models
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }  // Ensure this DbSet is included
      public DbSet<WishlistItem> WishlistItems { get; set; }
      public DbSet<OrderItem> OrderItems { get; set; }
      public DbSet<Coupon>Coupons{get;set;}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Review>()
        .HasOne(r => r.Product)
        .WithMany(p => p.Reviews)
        .HasForeignKey(r => r.ProductId)
        .OnDelete(DeleteBehavior.Cascade);  // If you want reviews to be deleted when a product is deleted
}}

}
