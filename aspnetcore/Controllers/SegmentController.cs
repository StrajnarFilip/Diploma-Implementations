using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using aspnetcore.BlogContext;
using aspnetcore.Models;
using aspnetcore;

namespace MvcMovie.Controllers
{
    public class SegmentController : Controller
    {
        [HttpGet("/post-segments/{postId}")]
        public ActionResult<SegmentResponse[]> GetSegments([FromRoute] long postId)
        {
            return postgresContext.DefaultContext.Segments
            .Where(segment => segment.PostIdpost == postId)
            .Select(segment => new SegmentResponse
            {
                Idsegment = segment.Idsegment,
                PostIdpost = segment.PostIdpost,
                Type = segment.Type,
                Text = segment.Text,
                Source = segment.Source,
            })
            .ToArray();
        }

        [HttpPost("/segment")]
        public async Task<ActionResult<SegmentResponse>> NewSegment([FromBody] SegmentRequest newSegment)
        {
            var context = postgresContext.DefaultContext;

            if (!Authentication.UserIsAdmin(context, this))
            {
                return Unauthorized("User is not an admin");
            }

            var createdSegment = await context.Segments.AddAsync(new Segment
            {
                PostIdpost = newSegment.PostIdpost,
                Type = newSegment.Type,
                Text = newSegment.Text,
                Source = newSegment.Source,
            });

            await context.SaveChangesAsync();

            return new SegmentResponse
            {
                Idsegment = createdSegment.Entity.Idsegment,
                PostIdpost = createdSegment.Entity.PostIdpost,
                Type = createdSegment.Entity.Type,
                Text = createdSegment.Entity.Text,
                Source = createdSegment.Entity.Source,
            };
        }

        [HttpDelete("/segment/{segmentId}")]
        public async Task<ActionResult<IdResponse>> DeleteSegment([FromRoute] long segmentId)
        {
            var context = postgresContext.DefaultContext;

            if (!Authentication.UserIsAdmin(context, this))
            {
                return Unauthorized("User is not an admin");
            }

            var deleteSegment = context.Segments.First(segment => segment.Idsegment == segmentId);
            context.Remove(deleteSegment);
            await context.SaveChangesAsync();
            return new IdResponse { Id = segmentId };
        }
    }
}