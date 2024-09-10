using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;

        public UsersController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var admin = _db.Users.ToList();
            return Ok(admin);
        }

        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            var orders = _db.Orders
                .Select(o => new
                {
                    OrderId = o.Id,           
                    UserName = o.User.Name,
                    UserAddress = o.User.Address,
                    UserEmail = o.User.Email,
                    UserPhoneNumber = o.User.PhoneNumber,
                    TotalAmount = o.TotalAmount,
                    OrderStatus = o.Status
                })
                .ToList();

            return Ok(orders);
        }




    }
}
