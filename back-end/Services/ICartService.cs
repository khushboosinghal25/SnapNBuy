using EcommercePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommercePlatform.Services{
    public interface ICartService{
        Task<List<Product>> GetProductsAsync();
        Task<List<CartItem>> GetCartItemsAsync();
        Task AddToCartAsync(CartItem cartItem);
        Task RemoveFromCartAsync(int id);
        Task UpdateCartItemAsync(CartItem updatedCartItem); // Added method
    }
}