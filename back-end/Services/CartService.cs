using EcommercePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EcommercePlatform.Services
{
    public class CartService : ICartService
    {
        private readonly ProductDbContext _context;
        public CartService(ProductDbContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<List<CartItem>> GetCartItemsAsync()
        {
            return await _context.CartItems.Include(c => c.Product).ToListAsync();
        }

        public async Task AddToCartAsync(CartItem cartItem)
        {
            try
            {
                var product = await _context.Products.FindAsync(cartItem.ProductId);
                if (product == null)
                {
                    throw new KeyNotFoundException("Product not found");
                }

                _context.CartItems.Add(cartItem);
                await _context.SaveChangesAsync();
            }
            catch (KeyNotFoundException ex)
            {
                throw new Exception("The product could not be found in the database. Please verify the product ID.", ex);
            }
        }

        public async Task RemoveFromCartAsync(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateCartItemAsync(CartItem updatedCartItem)
        {
            var existingCartItem = await _context.CartItems.FindAsync(updatedCartItem.CartItemId);
            if (existingCartItem == null)
            {
                throw new KeyNotFoundException("CartItem not found.");
            }

            // Update the properties of the existing cart item
            existingCartItem.Quantity = updatedCartItem.Quantity;
            existingCartItem.ProductId = updatedCartItem.ProductId;

            _context.CartItems.Update(existingCartItem);
            await _context.SaveChangesAsync();
        }
    }
}