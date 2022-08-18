using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Segment
    {
        public long Idsegment { get; set; }
        public long PostIdpost { get; set; }
        public string Type { get; set; } = null!;
        public string? Text { get; set; }
        public string? Source { get; set; }

        public virtual Post PostIdpostNavigation { get; set; } = null!;
    }
}
