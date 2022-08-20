using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using aspnetcore.BlogContext;
using aspnetcore.Models;
using aspnetcore;

namespace MvcMovie.Controllers
{
    public class PostController : Controller
    {
        [HttpGet("/posts")]
        public ShortPost[] GetPosts()
        {
            return postgresContext.DefaultContext.Posts
            .Select(post => new ShortPost { Idpost = post.Idpost, Title = post.Title })
            .ToArray();
        }

        [HttpGet("/post/{id}")]
        public ShortPost GetPost(long id)
        {
            var post = postgresContext.DefaultContext.Posts
            .First(post => post.Idpost == id);
            return new ShortPost
            {
                Title = post.Title,
                Idpost = post.Idpost
            };
        }

        [HttpPost("/post")]
        public async Task<ActionResult<IdResponse>> NewPost([FromBody] NewPost post)
        {
            var context = postgresContext.DefaultContext;
            if (!Authentication.UserIsAdmin(context, this))
            {
                return Unauthorized("User is not an admin");
            }

            if (post.Title is not null && Authentication.UserExists(context, this))
            {
                var user = Authentication.GetUser(context, this);
                var newPost = await context.Posts.AddAsync(new Post { Title = post.Title });
                await context.SaveChangesAsync();
                return new IdResponse { Id = newPost.Entity.Idpost };
            }
            throw new Exception("Title is null");
        }

        [HttpDelete("/post/{id}")]
        public async Task<ActionResult<String>> DeletePost([FromRoute] long id)
        {
            var context = postgresContext.DefaultContext;
            if (!Authentication.UserIsAdmin(context, this))
            {
                return Unauthorized("User is not an admin");
            }

            var postToDelete = context.Posts.Single(post => post.Idpost == id);
            var nodesToDelete = context.Segments.Where(segment => segment.PostIdpost == postToDelete.Idpost);
            var commentsToDelete = context.Comments.Where(comment => comment.PostIdpost == postToDelete.Idpost);

            context.Comments.RemoveRange(commentsToDelete);
            context.Segments.RemoveRange(nodesToDelete);
            context.Posts.Remove(postToDelete);
            await context.SaveChangesAsync();
            return Ok("Deleted");
        }
    }
}