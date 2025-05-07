using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using EcommercePlatform.Models;

namespace EcommercePlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public WishlistController(ProductDbContext context)
        {
            _context = context;
        }

        // GET: api/wishlist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishlistItem>>> GetWishlist()
        {
            return await _context.WishlistItems.ToListAsync();
        }

        // POST: api/wishlist
        [HttpPost]
        public async Task<ActionResult<WishlistItem>> AddToWishlist([FromBody] WishlistItem item)
        {
            if (item == null || string.IsNullOrEmpty(item.Name))
            {
                return BadRequest("Item name is required");
            }

            _context.WishlistItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishlist), new { id = item.Id }, item);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.WishlistItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.WishlistItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
