using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Segments = new HashSet<Segment>();
        }

        public long Idpost { get; set; }
        public string Title { get; set; } = null!;

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Segment> Segments { get; set; }
    }
}
