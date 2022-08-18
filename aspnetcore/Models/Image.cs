using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Image
    {
        public long Idimage { get; set; }
        public string Source { get; set; } = null!;
        public string? Description { get; set; }
    }
}
