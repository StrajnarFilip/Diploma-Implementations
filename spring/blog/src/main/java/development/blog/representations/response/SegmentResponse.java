package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SegmentResponse {
    Long idSegment;
    Long postIdPost;
    String type;
    String text;
    String source;

    public SegmentResponse(Long idSegment, Long postIdPost, String type, String text, String source) {
        this.idSegment = idSegment;
        this.postIdPost = postIdPost;
        this.type = type;
        this.text = text;
        this.source = source;
    }

    @JsonProperty("idsegment")
    public Long getIdSegment() {
        return idSegment;
    }

    @JsonProperty("postIdpost")
    public Long getPostIdPost() {
        return postIdPost;
    }

    @JsonProperty("type")
    public String getType() {
        return type;
    }

    @JsonProperty("text")
    public String getText() {
        return text;
    }

    @JsonProperty("source")
    public String getSource() {
        return source;
    }
}
