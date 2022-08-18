namespace aspnetcore.Models;

public class SegmentRequest
{
    public long PostIdpost { get; set; }
    public string Type { get; set; } = null!;
    public string? Text { get; set; }
    public string? Source { get; set; }
}