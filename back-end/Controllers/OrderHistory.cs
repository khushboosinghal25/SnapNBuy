using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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

    
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderlist()
        {
            return await _context.OrderItems.ToListAsync();
        }

        
        [HttpPost]
        public async Task<ActionResult<OrderItem>> AddToOrderlist([FromBody] OrderItem item)
        {
            if (item == null || string.IsNullOrEmpty(item.Name))
            {
                return BadRequest("Item name is required");
            }

            _context.OrderItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderlist), new { id = item.Id }, item);
        }
        


    }
}
