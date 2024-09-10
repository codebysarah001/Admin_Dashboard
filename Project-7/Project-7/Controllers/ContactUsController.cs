using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IEmailService _emailService;

        public ContactUsController(MyDbContext dbContext, IEmailService iemailservice)
        {
            _db = dbContext;
            _emailService = iemailservice;
        }

        [HttpGet("AllContacts")]
        public IActionResult AllContacts()
        {
            var users = _db.ContactUs.ToList();

            return Ok(users);
        }

        [HttpGet("contactMsg/{userId}")]
        public IActionResult contactMsg(int userId)
        {

            var massege = _db.ContactUs.Where(m => m.Id == userId);

            return Ok(massege);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            if (ModelState.IsValid)
            {
                await _emailService.SendEmailAsync(request.To, request.Subject, request.Body);
                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}
