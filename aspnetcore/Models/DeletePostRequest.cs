namespace aspnetcore.Models;

public class DeletePostRequest{
    public string? Token { get; set; }
    public long PostId { get; set; }
}