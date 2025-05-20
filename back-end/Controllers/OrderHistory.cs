using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EcommercePlatform.Models;

namespace EcommercePlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public OrderController(ProductDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderList()
        {
            return await _context.OrderItems.ToListAsync();
        }

        // POST: api/Order (single item)
        [HttpPost]
        public async Task<ActionResult<OrderItem>> AddToOrderList([FromBody] OrderItem item)
        {
            if (item == null || string.IsNullOrWhiteSpace(item.Name))
            {
                return BadRequest("Item name is required.");
            }

            _context.OrderItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderList), new { id = item.Id }, item);
        }

        // POST: api/Order/Bulk (multiple items)
        [HttpPost("Bulk")]
        public async Task<ActionResult> AddMultipleToOrderList([FromBody] List<OrderItem> items)
        {
            if (items == null || !items.Any())
            {
                return BadRequest("Order item list cannot be empty.");
            }

            foreach (var item in items)
            {
                if (string.IsNullOrWhiteSpace(item.Name))
                {
                    return BadRequest("Each item must have a valid name.");
                }
            }

            _context.OrderItems.AddRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"{items.Count} items added successfully." });
        }
    }
}
