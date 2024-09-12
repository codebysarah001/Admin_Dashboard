using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.Models;
using System.Net.Mail;
using System.Net;
using Project_7.DTO;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsLetterController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IEmailService _emailService;

        public NewsLetterController(MyDbContext dbContext, IEmailService iemailservice)
        {
            _db = dbContext;
            _emailService = iemailservice;
        }

        [HttpGet("GetAllSubscription")]
        public IActionResult GetAllSubscription()
        {
            var letter = _db.Newsletters.ToList();
            return Ok(letter);
        }

        [HttpPost("SendNewsLetters")]
        public async Task<IActionResult> SendNewsLetters()
        {
            var subscribers = _db.Newsletters.ToList();
            var latestNews = _db.LatestNews.ToList();

            if (subscribers == null || !subscribers.Any())
            {
                return NotFound("No subscribers found.");
            }

            if (latestNews == null || !latestNews.Any())
            {
                return NotFound("No news available.");
            }

            foreach (var subscriber in subscribers)
            {
                var emailBody = GenerateEmailBody(latestNews);

                try
                {
                    await _emailService.SendEmailAsync(subscriber.Email, "Latest News from Our Newsletter", emailBody);
                }
                catch (Exception ex)
                {
                    // Log or handle the error
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Error sending email: {ex.Message}");
                }
            }

            return Ok("Emails sent successfully.");
        }

        private string GenerateEmailBody(List<LatestNews> newsItems)
        {
            var body = "<h1>Latest News</h1>";

            foreach (var news in newsItems)
            {
                body += $"<h2>{news.NewsType}</h2><p>{news.Description}</p><img src='{news.ImageUrl}' alt='News Image' /><br/>";
            }

            return body;
        }
    }
}
