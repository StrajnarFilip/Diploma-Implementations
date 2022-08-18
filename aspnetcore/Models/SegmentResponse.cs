namespace aspnetcore.Models;

public class SegmentResponse
{
    public long Idsegment { get; set; }
    public long PostIdpost { get; set; }
    public string Type { get; set; } = null!;
    public string? Text { get; set; }
    public string? Source { get; set; }
}