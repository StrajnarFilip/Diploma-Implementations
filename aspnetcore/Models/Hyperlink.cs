using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Hyperlink
    {
        public long Idhyperlink { get; set; }
        public string? Href { get; set; }
        public string Text { get; set; } = null!;
    }
}
