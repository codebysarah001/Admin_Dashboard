namespace Project_7.DTO
{
    public class LatestNewsDTO
    {
        public string ImageUrl { get; set; } = null!;

        public string? NewsType { get; set; }

        public string Description { get; set; } = null!;

        public DateTime? PublishedAt { get; set; }
    }
}
