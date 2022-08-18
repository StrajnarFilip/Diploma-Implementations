using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Comment
    {
        public long Idcomment { get; set; }
        public string Content { get; set; } = null!;
        public long PostIdpost { get; set; }
        public long UserIduser { get; set; }

        public virtual Post PostIdpostNavigation { get; set; } = null!;
        public virtual User UserIduserNavigation { get; set; } = null!;
    }
}
