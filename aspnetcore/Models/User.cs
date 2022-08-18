using System;
using System.Collections.Generic;

namespace aspnetcore.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
        }

        public long Iduser { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Cookie { get; set; }
        public string? Role { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
