using EcommercePlatform.Models;
using EcommercePlatform.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommercePlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // Get all products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        // Get a specific product by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // Add a new product
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            await _productService.AddProductAsync(product);
            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // Update an existing product
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.ProductId)
                return BadRequest();
            await _productService.UpdateProductAsync(product);
            return NoContent();
        }

        // Delete a product by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }

        // Add a review for a product
        [HttpPost("{productId}/reviews")]
        public async Task<ActionResult> AddReview(int productId, [FromBody] Review review)
        { 
            if (productId != review.ProductId)
            {
                return BadRequest("Product ID mismatch.");
            }

            // Validate the review model before saving
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _productService.AddReviewAsync(review);
                return Ok("Review added successfully.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // Get a product with its reviews
        [HttpGet("{productId}/reviews")]
public async Task<ActionResult<Product>> GetProductWithReviews(int productId)
{
    try
    {
        var product = await _productService.GetProductWithReviewsAsync(productId);
        if (product == null)
            return NotFound();

        return Ok(product);
    }
    catch (Exception ex)
    {
        // Log the exception
        Console.WriteLine($"Error: {ex.Message}");
        return StatusCode(500, "Internal server error");
    }
}

    }
}
