namespace aspnetcore.Models;

public class DeleteCommentRequest
{
    public string? Token { get; set; }
    public long CommentId { get; set; }
}