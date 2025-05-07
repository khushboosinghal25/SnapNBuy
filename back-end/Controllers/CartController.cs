using EcommercePlatform.Models;
using EcommercePlatform.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EcommercePlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var cartItems = await _cartService.GetCartItemsAsync();
            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItem cartItem)
        {
            await _cartService.AddToCartAsync(cartItem);
            
            // Ensure CartItemId is populated after saving
            return CreatedAtAction(nameof(GetCartItems), new { id = cartItem.CartItemId }, cartItem);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] CartItem updatedCartItem)
        {
            if (id != updatedCartItem.CartItemId)
            {
                return BadRequest("CartItem ID mismatch.");
            }

            var existingCartItem = await _cartService.GetCartItemsAsync();
            if (existingCartItem == null)
            {
                return NotFound("CartItem not found.");
            }

            await _cartService.UpdateCartItemAsync(updatedCartItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            await _cartService.RemoveFromCartAsync(id);
            return NoContent();
        }
    }
}