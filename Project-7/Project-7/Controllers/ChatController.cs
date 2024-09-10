using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ChatController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("AllUsers")]
        public IActionResult AllUsers()
        {
            var users = _db.Chats.ToList();

            return Ok(users);
        }


        [HttpGet("showMessage/{userId}")]
        public IActionResult showMessage(int userId)
        {

            var massege = _db.ChatMessages.Where(m => m.ChatId == userId);


            return Ok(massege);
        }

        [HttpPost("replayMessage/{userId}")]
        public IActionResult replayMessage([FromForm] string cmessages, [FromForm] int flag, int userId)
        {
            if (string.IsNullOrEmpty(cmessages))
            {
                return BadRequest("Message content is required.");
            }

            var newMessage = new ChatMessage
            {
                ChatId = userId,
                Cmessages = cmessages,
                Flag = flag
            };

            _db.ChatMessages.Add(newMessage);
            _db.SaveChanges();

            return Ok(newMessage);
        }


    }
}
