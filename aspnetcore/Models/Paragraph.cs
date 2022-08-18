using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Paragraph
    {
        public long Idparagraph { get; set; }
        public string Content { get; set; } = null!;
    }
}
