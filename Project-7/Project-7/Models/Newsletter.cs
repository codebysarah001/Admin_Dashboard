using System;
using System.Collections.Generic;

namespace Project_7.Models;

public partial class Newsletter
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }
}
