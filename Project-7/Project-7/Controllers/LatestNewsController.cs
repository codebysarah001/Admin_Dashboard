using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LatestNewsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public LatestNewsController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("GetLatestNews")]
        public IActionResult GetLatestNews()
        {
            var letter = _db.LatestNews.ToList();
            return Ok(letter);
        }

        [HttpGet("GetNewsById/{id:int}")]
        public IActionResult GetNewsById(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid News ID.");
            }

            var news = _db.LatestNews.Find(id);
            if (news == null)
            {
                return NotFound("News Letter not found.");
            }

            return Ok(news);
        }

        [HttpPost("AddNews")]
        public IActionResult AddNews([FromForm] LatestNewsDTO latestnewsdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newNews = new LatestNews
            {
                ImageUrl = latestnewsdto.ImageUrl,
                NewsType = latestnewsdto.NewsType,
                Description = latestnewsdto.Description,
                PublishedAt = latestnewsdto.PublishedAt,

            };

            _db.LatestNews.Add(newNews);
            _db.SaveChanges();

            return Ok();
        }



        [HttpPut("UpdateNews/{id}")]
        public IActionResult UpdateNews(int id, [FromForm] LatestNewsDTO latestnewsdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingNews = _db.LatestNews.Find(id);
            if (existingNews == null)
            {
                return NotFound();
            }

            existingNews.ImageUrl = latestnewsdto.ImageUrl;
            existingNews.NewsType = latestnewsdto.NewsType;
            existingNews.Description = latestnewsdto.Description;
            existingNews.PublishedAt = latestnewsdto.PublishedAt;

            _db.SaveChanges();

            return Ok();
        }

        [HttpDelete("DeleteNews/{id}")]
        public IActionResult DeleteNews(int id)
        {
            var newsItem = _db.LatestNews.Find(id);
            if (newsItem == null)
            {
                return NotFound();
            }

            _db.LatestNews.Remove(newsItem);
            _db.SaveChanges();

            return Ok();
        }

    }
}
