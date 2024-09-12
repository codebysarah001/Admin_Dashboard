using System.Net.Mail;
using System.Net;

namespace Project_7.DTO
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;
        private readonly ILogger<EmailService> _logger;

        public EmailService(string smtpServer, int smtpPort, string smtpUser, string smtpPass, ILogger<EmailService> logger)
        {
            _smtpServer = smtpServer;
            _smtpPort = smtpPort;
            _smtpUser = smtpUser;
            _smtpPass = smtpPass;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("batoulkhazali96@gmail.com", "fyqh zvgz bgyv gail"),
                EnableSsl = true, // Ensure SSL/TLS is enabled
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("batoulkhazali96@gmail.com"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(to);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Email sent successfully.");
            }
            catch (SmtpException ex)
            {
                _logger.LogError($"SMTP Exception: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception: {ex.Message}");
            }
        }
    }
}
