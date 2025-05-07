using EcommercePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommercePlatform.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();             
        Task<Product> GetProductByIdAsync(int id);         
        Task AddProductAsync(Product product);              
        Task UpdateProductAsync(Product product);           
        Task DeleteProductAsync(int id);                    
        Task AddReviewAsync(Review review);                 
        Task<Product> GetProductWithReviewsAsync(int productId);    
    }
}
