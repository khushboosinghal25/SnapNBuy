using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EcommercePlatform.Models;

namespace EcommercePlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public SubscriptionController(ProductDbContext context)
        {
            _context = context;
        }

        // Method to subscribe the user and assign coupons
        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToPremium([FromBody] SubscriptionRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            
            user.SubscriptionTier = "Premium";
            await _context.SaveChangesAsync();

          
            var coupons = new List<Coupon>
            {
                new Coupon { Code = "PREMIUM10", DiscountAmount = 10, UserId = user.Id },
                new Coupon { Code = "PREMIUM20", DiscountAmount = 20, UserId = user.Id }
            };

          
            _context.Coupons.AddRange(coupons);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subscription successful", coupons });
        }
    }

    // Subscription request model
    public class SubscriptionRequest
    {
        public int UserId { get; set; }
    }
}
