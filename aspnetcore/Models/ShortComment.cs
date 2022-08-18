using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public class ShortComment
    {
        public long Idcomment { get; set; }
        public string Content { get; set; } = null!;
        public long? PostIdpost { get; set; }
        public long? UserIduser { get; set; }
    }
}