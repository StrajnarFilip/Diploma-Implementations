using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using aspnetcore.BlogContext;
using aspnetcore.Models;
using aspnetcore;

namespace MvcMovie.Controllers
{
    public class CommentController : Controller
    {
        [HttpGet("/comment/{id}")]
        public ShortComment GetComment([FromRoute] long id)
        {
            var comment = postgresContext.DefaultContext.Comments
            .Single(comment => comment.Idcomment == id);

            return new ShortComment
            {
                Idcomment = comment.Idcomment,
                Content = comment.Content,
                UserIduser = comment.UserIduser,
                PostIdpost = comment.PostIdpost
            };
        }

        [HttpGet("/post-comments/{id}")]
        public ShortComment[] GetCommentsOfPost([FromRoute] long id)
        {
            var comments = postgresContext.DefaultContext.Comments
            .Where(comment => comment.PostIdpost == id)
            .Select(comment => new ShortComment
            {
                Idcomment = comment.Idcomment,
                Content = comment.Content,
                UserIduser = comment.UserIduser,
                PostIdpost = comment.PostIdpost
            })
            .ToArray();

            return comments;
        }

        [HttpPost("/comment")]
        public async Task<ShortComment?> NewComment([FromBody] NewComment newComment)
        {
            var context = postgresContext.DefaultContext;
            if (newComment.Content is not null && Authentication.UserExists(context, this))
            {
                var createdComment = await context.AddAsync(new Comment
                {
                    Content = newComment.Content,
                    PostIdpost = newComment.PostId,
                    UserIduser = Authentication.GetUser(context, this).Iduser
                });

                await context.SaveChangesAsync();

                return new ShortComment
                {
                    Idcomment = createdComment.Entity.Idcomment,
                    Content = createdComment.Entity.Content,
                    UserIduser = createdComment.Entity.UserIduser,
                    PostIdpost = createdComment.Entity.PostIdpost
                };
            }

            return null;
        }

        [HttpDelete("/comment/{id}")]
        public async Task<ActionResult<IdResponse>> DeleteComment([FromRoute] long id)
        {
            if (Authentication.UsersToken(this) is not null)
            {
                var context = postgresContext.DefaultContext;
                var userId = Authentication.GetUser(context, this).Iduser;
                
                var comment = context.Comments
                .First(comment => comment.Idcomment == id &&
                comment.UserIduser == userId);

                context.Remove(comment);

                await context.SaveChangesAsync();
                return new IdResponse { Id = id };
            }
            return Unauthorized("User token is null");
        }

    }
}