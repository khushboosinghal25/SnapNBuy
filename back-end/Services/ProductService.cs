using EcommercePlatform.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommercePlatform.Services
{
    public class ProductService : IProductService
    {
        private readonly ProductDbContext _context;

        public ProductService(ProductDbContext context)
        {
            _context = context;
        }

        // Get all products
        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        // Get a product by ID
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        // Add a new product
        public async Task AddProductAsync(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        // Update an existing product
        public async Task UpdateProductAsync(Product product)
        {
            product.UpdatedAt = DateTime.UtcNow;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        // Delete a product
        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }

        // Add a review for a product
        public async Task AddReviewAsync(Review review)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductId == review.ProductId);

            if (product != null)
            {
                review.CreatedAt = DateTime.UtcNow;
                _context.Reviews.Add(review);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Product not found");
            }
        }

        // Get a product with its reviews
       public async Task<Product> GetProductWithReviewsAsync(int productId)
{
    try
    {
        var product = await _context.Products
            .Include(p => p.Reviews) 
            .FirstOrDefaultAsync(p => p.ProductId == productId);

        if (product == null)
        {
            throw new Exception("Product not found");
        }

        return product;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in GetProductWithReviewsAsync: {ex.Message}");
        throw;
    }
}

    }
}
