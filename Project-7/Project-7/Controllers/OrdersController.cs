using iTextSharp.text.pdf;
using iTextSharp.text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Project_7.DTO;
using Project_7.Models;
using Microsoft.EntityFrameworkCore;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _db;

        public OrdersController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("DownloadPDF")]
        public IActionResult DownloadPDF()
        {
            // Retrieve all users and their orders
            var users = _db.Users.Include(u => u.Orders).ThenInclude(o => o.OrderItems).ToList();



            if (users == null || !users.Any())
            {
                return NotFound();
            }

            // Create a PDF document
            using (var memoryStream = new MemoryStream())
            {
                var document = new Document();
                PdfWriter.GetInstance(document, memoryStream);
                document.Open();

                foreach (var user in users)
                {
                    // Add user details
                    document.Add(new Paragraph($"User Name: {user.Name}"));
                    document.Add(new Paragraph($"Email: {user.Email}"));
                    document.Add(new Paragraph($"Phone Number: {user.PhoneNumber}"));
                    document.Add(new Paragraph("Order Items:"));

                    foreach (var order in user.Orders)
                    {
                        foreach (var item in order.OrderItems)
                        {
                            document.Add(new Paragraph($"- Order ID: {order.Id}, Book ID: {item.BookId}, Price: {item.Price}, Quantity: {item.Quantity}"));
                        }
                    }

                    // Add a page break after each user
                    document.Add(new Paragraph("\n"));
                }

                document.Close();

                // Prepare PDF file for download
                var fileBytes = memoryStream.ToArray();
                var fileName = "all_orders_details.pdf";

                return File(fileBytes, "application/pdf", fileName);
            }
        }



        [HttpGet("DownloadExcel")]
        public IActionResult DownloadExcel()
        {
            var users = _db.Users
                .Include(u => u.Orders)
                .ThenInclude(o => o.OrderItems)
                .ToList();

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Create an Excel package
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Order Details");

                // Set headers
                worksheet.Cells[1, 1].Value = "User Name";
                worksheet.Cells[1, 2].Value = "Email";
                worksheet.Cells[1, 3].Value = "Phone Number";
                worksheet.Cells[1, 4].Value = "Order ID";
                worksheet.Cells[1, 5].Value = "Book ID";
                worksheet.Cells[1, 6].Value = "Price";
                worksheet.Cells[1, 7].Value = "Quantity";

                int row = 2; // Starting row for data

                foreach (var user in users)
                {
                    foreach (var order in user.Orders)
                    {
                        foreach (var item in order.OrderItems)
                        {
                            worksheet.Cells[row, 1].Value = user.Name;
                            worksheet.Cells[row, 2].Value = user.Email;
                            worksheet.Cells[row, 3].Value = user.PhoneNumber;
                            worksheet.Cells[row, 4].Value = order.Id;
                            worksheet.Cells[row, 5].Value = item.BookId;
                            worksheet.Cells[row, 6].Value = item.Price;
                            worksheet.Cells[row, 7].Value = item.Quantity;
                            row++;
                        }
                    }
                }

                // Prepare Excel file for download
                var fileBytes = package.GetAsByteArray();
                var fileName = "all_orders_details.xlsx";

                return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
        }

    }
}
