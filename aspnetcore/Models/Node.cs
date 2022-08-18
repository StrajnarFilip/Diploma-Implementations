using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Node
    {
        public long Idnode { get; set; }
        public long? PostIdpost { get; set; }
        public string Type { get; set; } = null!;
        public long Contentid { get; set; }

        public virtual Post? PostIdpostNavigation { get; set; }
    }
}
